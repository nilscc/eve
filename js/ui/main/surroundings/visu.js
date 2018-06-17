import * as esi from '../../../esi.js'

import * as simulation from './visu/simulation.js'
import Node            from './visu/node.js'
import Link            from './visu/link.js'
import draw            from './visu/draw.js'

/*
 * HTML elements
 *
 */

const svg = d3.select("main #surroundings svg")

const width = +svg.attr("width"),
      height = +svg.attr("height")

/*
 * Functions
 *
 */

export default function visualize (systems, stargates, arg) {

  const callback = arg.hasOwnProperty("onclick")
    ? arg.onclick
    : (obj) => {
      console.log("visualize.callback", obj)
    }

  try {
    // Convert to visualization elements
    const nodes = Array.from(systems).map(s => new Node(s, null, callback))
    const links = Array.from(stargates).map(g => new Link(g))

    // Load/setup simulation
    const sim = simulation.load(width, height)

    // Draw elements
    const drawing = draw(svg, nodes, links, sim)

    // Run simulation on drawing elements
    simulation.run(sim, nodes, links, drawing)
  }
  catch (e) {
    console.error(e)
    throw "Failed to visualize surroundings: " + e.message
  }
}
