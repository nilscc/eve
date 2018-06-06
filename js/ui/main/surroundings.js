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
    .then(([kills, system]) => {
      loadSurroundings(token, kills, system, 5)
        .then(function (stargates) {
          visualize(kills, system.system_id, stargates)
        })
    })
}

function loadSurroundings(token, kills, system, level) {

  const system_id = system.system_id
  const stargates = system.stargates

  return Promise.all(stargates.map((g) => esi.universe.stargate(token, g)))
    .then((stargates) => {
      if (level > 1)
        return Promise.all(stargates.map((g) => esi.universe.system(token, g.destination.system_id)))
          .then((systems) => {
            return Promise.all(systems.map((s) => loadSurroundings(token, kills, s, level - 1)))
              .then((moregates) => stargates.concat(...moregates))
          })
      else
        return stargates
    })
}
