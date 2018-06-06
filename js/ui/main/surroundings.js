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
  const [ss, gs] = await loadSurroundings(system, 4, 20)
  visualize(ss, gs)
}

function flatten(array) {
  return [].concat(...array)
}

async function gates(system) {
  return Promise.all(system.stargates.map((gid) => esi.universe.stargate(gid)))
}

async function loadSurroundings(system, level, limit) {

  if (level < 0)
    return

  // Visited systems
  let systemIds = new Set([system.system_id])

  let solarsystems = new Set([system])
  let stargates = new Set()

  // Start with the current set of gates
  let _gates = await gates(system)

  for (let i = 0; (i < level) && (systemIds.size < limit); i++) {

    // Lookup neighbouring systems + gates

    const _systems = await Promise.all(_gates.map(g =>
      esi.universe.system(g.destination.system_id))
    )

    _gates = flatten(await Promise.all(_systems.map(s => gates(s))))

    // Add results

    _systems.forEach(s => {
      if (!systemIds.has(s.system_id)) {
        systemIds.add(s.system_id)
        solarsystems.add(s)
      }
    })
    _gates.forEach(g => stargates.add(g))

    // Remove gates to already known systems for next iteration
    _gates = _gates.filter(g => !systemIds.has(g.destination.system_id))
  }

  console.log("IDs:", Array.from(systemIds))
  console.log("Solarsystems:", Array.from(solarsystems))

  // Load the final neighbour system set
  {
    const _systems = await Promise.all(_gates.map(g =>
      esi.universe.system(g.destination.system_id))
    )
    _systems.forEach(s => {
      if (!systemIds.has(s.system_id)) {
        systemIds.add(s.system_id)
        solarsystems.add(s)
      }
    })

    console.log("Final:", Array.from(_systems))
  }

  console.log("Solarsystems:", Array.from(solarsystems))
  console.log("Stargates:   ", Array.from(stargates))

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
