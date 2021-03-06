export function load (width, height) {

  const centerX = width / 2,
        centerY = height / 2

  return d3.forceSimulation()
    .force("link", d3.forceLink()
      .id(g => g.id())
    )
    .force("charge", d3.forceManyBody()
      .strength(n => n.charge())
    )
    .force("radial", d3.forceRadial(s => s.radius(), centerX, centerY)
      .strength(1)
    )
}

export function run (simulation, nodes, links, [node, link]) {

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
        .attr("cx", n => n._x())
        .attr("cy", n => n._y())
  }
}
