class Node {
  constructor(system_id, group, kills) {
    this.id = system_id

    if (!group)
      group = 1
    this.group = group

    this.kills = kills
  }

  color() {
    if (this.kills.pod + this.kills.ship > 0)
      return d3.color("red")
    else if (this.kills.npc > 252)
      return d3.color("lightgreen")
    else if (this.kills.npc > 100)
      return d3.color("green")

    // Default value
    return d3.scaleOrdinal(d3.schemeCategory20)(this.group)
  }

  size() {
    return 5
  }
}

class Link {
  constructor(system_id_1, system_id_2, value) {
    this.source = Math.min(system_id_1, system_id_2)
    this.target = Math.max(system_id_1, system_id_2)

    if (!value)
      value = 5
    this.value = value
  }
}

export default function visualize (kills, system_id, stargates) {

  // Transform data

  let system_ids = new Set([system_id])

  // Also make sure to add all star gate systems
  stargates.forEach((gate) => {
    system_ids.add(gate.system_id)
    system_ids.add(gate.destination.system_id)
  })

  let nodes = [...system_ids].map((id) => {
    const group     = (id == system_id) ? 1 : 5
    return new Node(id, group, kills(id))
  })
  let links = [...new Set(stargates.map((gate) => new Link(gate.system_id, gate.destination.system_id)))]

  draw(nodes, links)
}

function draw (nodes, links) {

  //
  // Draw
  //

  let svg = d3.select("#surroundings svg")

  const width = +svg.attr("width"),
        height = +svg.attr("height")

  let simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value) })

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
      .attr("r",    function(d) { return d.size() })
      .attr("fill", function(d) { return d.color() })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}