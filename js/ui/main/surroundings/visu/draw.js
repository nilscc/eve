export default function draw (svg, nodes, links, simulation) {

  //
  // Draw
  //

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

  return [node, link]
}
