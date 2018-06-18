/** Surroundings UI
 *
 * This module implements the "surroundings" UI element. The surroundings
 * module looks up the current character location and then scans the
 * surrounding systems for either NPC or player kills (and possibly other
 * interesting statisics).
 *
 */

import visualizeSurroundings from './surroundings/visu.js'
import loadSurroundings      from './surroundings/load.js'

/*
 * DOM control
 *
 */

const elem = document.querySelector("main #surroundings")

export function show () { elem.style.display = "flex" }
export function hide () { elem.style.display = "none" }

/*
 * Functions
 *
 */

class Surroundings {
  constructor (systems, gates) {
    this.systems = systems
    this.gates = gates
  }

  visualize () {
    visualizeSurroundings(
      this.systems,
      this.gates,
      {
        mouseover: o => this.select(o),
        onclick: o => this.waypoint(o),
      })
    show()
  }

  update (system) {
  }

  select (object, selector = ".selected-system") {
    console.log("Surroundings.select", object)

    const selectedSystem = elem.querySelector(".right-menu " + selector)

    selectedSystem.style.display = "block"

    // set system name
    selectedSystem.querySelector("h4")
      .innerText = object.system.name

    // get selected system table
    const t = selectedSystem.querySelector("table")

    // set security status
    t.querySelector("td.security-status")
      .innerText = object.system.security_status.toFixed(2)

    // show kills
    t.querySelector("td.ship-kills")
      .innerText = object.kills.ship
    t.querySelector("td.pod-kills")
      .innerText = object.kills.pod
    t.querySelector("td.npc-kills")
      .innerText = object.kills.npc
  }

  waypoint (object) {
    console.log("Surroundings.waypoint", object)
    this.select(object, ".waypoint-system")
  }
}

// Load the current surrounding environment
export async function load (system) {
  console.log("Loading surroundings...")

  const [systems, gates] = await loadSurroundings(system, 4, 50)

  console.log("Surrounding systems:", systems)
  console.log("Surrounding gates:",   gates)

  return new Surroundings(systems, gates)
}
