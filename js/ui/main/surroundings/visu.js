import * as esi from '../../../esi.js'

class Node {
  constructor(system, group) {
    this.system = system

    if (!group)
      group = 2
    this.group = group

    // lookup system kills
    this.kills = esi.universe.kills(system.system_id)
  }

  id () {
    return this.system.system_id
  }

  title() {
    return this.system.name + " (" + this.system.security_status.toFixed(2) + ")"
  }

  color() {
    if (this.kills.pod + this.kills.ship > 0)
      return d3.color("red")
    else if (this.kills.npc > 100)
      return d3.color("lightgreen")
    else if (this.kills.npc > 0)
      return d3.color("green")

    // Default value
    return d3.scaleOrdinal(d3.schemeCategory20)(this.group)
  }

  size() {
    return 5
  }

  classes () {
    const s = Math.max(0, this.system.security_status).toFixed(1)
    return "sec-" + s.split(".").join("")
  }
}

class Link {
  constructor(gate, value) {
    const s1 = gate.system_id,
          s2 = gate.destination.system_id

    this.source = Math.min(s1, s2)
    this.target = Math.max(s1, s2)

    if (!value)
      value = 5
    this.value = value
  }
}

export default function visualize (systems, stargates) {

  const nodes = Array.from(systems).map(s => new Node(s))
  const links = Array.from(stargates).map(g => new Link(g))

  draw(nodes, links)
}

const svg = d3.select("main #surroundings svg")

function draw (nodes, links) {

  console.log(nodes, links)

  //
  // Draw
  //

  const width = +svg.attr("width"),
        height = +svg.attr("height")

  let simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id() }))
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
      .attr("class", function(d) { return d.classes() })
      .attr("r",     function(d) { return d.size() })
      .attr("fill",  function(d) { return d.color() })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))

  node.append("title")
      .text(function(d) { return d.title() })

  simulation
      .nodes(nodes)
      .on("tick", ticked)

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
