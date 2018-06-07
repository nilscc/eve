/** Surroundings UI
 *
 * This module implements the "surroundings" UI element. The surroundings
 * module looks up the current character location and then scans the
 * surrounding systems for either NPC or player kills (and possibly other
 * interesting statisics).
 *
 */

import visualize        from './surroundings/visu.js'
import loadSurroundings from './surroundings/load.js'

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

// Load the current surrounding environment
export async function load (system) {
  console.log("Loading surroundings...")

  const [ss, gs] = await loadSurroundings(system, 4, 20)

  console.log("Surrounding systems:", ss)
  console.log("Surrounding gates:", gs)

  visualize(ss, gs)
}
