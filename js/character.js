import verify from './esi/verify.js'
import request from './esi/request.js'

import Location from './location.js'

/*
 * Identity
 *
 */

export class Character {
  constructor(id, name) {
    this.id = id
    this.name = name
  }

  location (token) {
    return request(token, "characters/" + this.id + "/location/")
      .then(function (r) {
        return new Location(r)
      })
  }
}

export function load (token) {
  return verify(token).then((r) => {
    return new Character(r.CharacterID, r.CharacterName)
  })
}

/*
let character = {}

character.load_surroundings = function (cb) {

  surroundings = {}

  let running = []
  let limit = 5
  function jump(jumps, gates) {
    if (jumps <= limit) {

      if (!surroundings.hasOwnProperty(jumps)) {
        surroundings[jumps] = {}
      }

      for (var i in gates) {
        let gate_id = gates[i]
        running.push(gate_id)
        esi.universe.load_stargate(gate_id, function(g, s) {
          running.pop() // remove thread from 'running' counter

          let system_id = s.system_id

          // check if system is already known
          for (var j = 1; j <= jumps; j++) {
            if (surroundings[j].hasOwnProperty(system_id)) {
              return;
            }
          }

          surroundings[jumps][system_id] = s
          jump(jumps + 1, s.stargates)

          console.log(running)
          if (0 == running.length && cb) {
            cb()
          }
        })
      }
    }
  }

  jump(1, character.location.stargates)

  // store result
  character.surroundings = surroundings
}
*/
