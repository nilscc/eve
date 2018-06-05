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

// Load the current surrounding environment
export function load (token) {
  console.log("Loading surroundings...")

  const promises = [
    esi.universe.kills(token),
    esi.character.system(token),
  ]

  return Promise.all(promises)
    .then(([kills, system]) => loadSurroundings(token, kills, system))
}

function loadSurroundings(token, kills, system) {

  const system_id = system.system_id
  const stargates = system.stargates

  return Promise.all(stargates.map((g) => esi.universe.stargate(token, g)))
    .then(function (stargates) {
      stargates.map((stargate) => {
        console.log("Loaded stargate:", stargate, kills(stargate.destination.system_id))
      })
      visualize(kills, system_id, stargates)
    })
}
