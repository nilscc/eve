/** Surroundings UI
 *
 * This module implements the "surroundings" UI element. The surroundings
 * module looks up the current character location and then scans the
 * surrounding systems for either NPC or player kills (and possibly other
 * interesting statisics).
 *
 */

import * as esi  from '../../esi.js'
import visualize from './surroundings/visu.js'

const elem = document.querySelector("main #surroundings")

// Load the current surrounding environment
export async function load (system) {
  console.log("Loading surroundings...")
  const [ss, gs] = await loadSurroundings(system, 3)
  visualize(ss, gs)
}

function flatten(array) {
  return [].concat(...array)
}

async function gates(system) {
  return Promise.all(system.stargates.map((gid) => esi.universe.stargate(gid)))
}

async function loadSurroundings(system, level) {

  // Visited systems
  let systems = {}

  systems[system.system_id] = system

  let stargates = new Set()

  // Start with the current set of gates
  let _gates = await gates(system)

  for (let i = 0; i < level; i++) {

    // Lookup neighbouring systems
    const _systems = await Promise.all(_gates.map(g => esi.universe.system(g.destination.system_id)))
    _systems.forEach(s => systems[s.system_id] = s)

    // Get all gates of the surrounding systems
    _gates = flatten(await Promise.all(_systems.map(s => gates(s))))

    _gates.forEach(g => stargates.add(g))

    // Remove gates to already visited systems
    _gates = _gates.filter(g => !systems.hasOwnProperty(g.destination.system_id))
  }

  // Load the final neighbour system set
  {
    const _systems = await Promise.all(_gates.map(g => esi.universe.system(g.destination.system_id)))
    _systems.forEach(s => systems[s.system_id] = s)
    console.log(_systems)
  }

  // build a set from the systems object
  let solarsystems = new Set()
  for (let prop in systems)
    if (systems.hasOwnProperty(prop))
      solarsystems.add(systems[prop])

  console.log("Solarsystems:", solarsystems)
  console.log("Stargates:   ", stargates)

  return [ solarsystems, stargates ]
}


/*
function loadSurroundings(system, level) {

  const systems = new Set([system])

  for (; level > 0; level--) {

  }

  const stargates = new system.stargates

  return Promise.all(stargates.map((g) => esi.universe.stargate(token, g)))
    .then((stargates) => {
      if (level > 1)
        return Promise.all(stargates.map((g) => esi.universe.system(token, g.destination.system_id)))
          .then((systems) => {
            return Promise.all(systems.map((s) => loadSurroundings(s, level - 1)))
              .then((moregates) => stargates.concat(...moregates))
          })
      else
        return stargates
    })
}
*/

export function show () { elem.style.display = "block" }
export function hide () { elem.style.display = "none" }
