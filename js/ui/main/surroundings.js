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

export function show () { elem.style.display = "block" }
export function hide () { elem.style.display = "none" }

/*
 * Functions
 *
 */

let surroundings

// Load the current surrounding environment
export async function load (system) {
  console.log("Loading surroundings...")

  surroundings = await loadSurroundings(system, 4, 20)

  console.log("Surrounding systems:", surroundings[0])
  console.log("Surrounding gates:",   surroundings[1])
}

export function visualize () {
  const [ss,gs] = surroundings
  visualizeSurroundings(ss, gs)
}
