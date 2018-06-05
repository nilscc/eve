import * as universe from './universe.js'

import request  from './token/request.js'
import verify   from './token/verify.js'

/*
 * Identity
 *
 */

export class Location {
  constructor(loc) {
    this._loc = loc
  }

  isDocked () {
    return this._loc.hasOwnProperty("structure_id")
  }

  system (token) {
    return universe.system(token, this._loc.solar_system_id)
  }
}

export class Character {
  constructor(id, name) {
    this.id = id
    this.name = name
  }

  location (token) {
    let promise = request(token, "characters/" + this.id + "/location/")
      .then(function (l) { return new Location(l) })

    promise.system = function () {
      return promise.then(function (l) { return l.system(token) })
    }

    return promise
  }

  system (token) {
    return this.location(token).then(function (l) {
      return l.system(token)
    })
  }
}

let _char

export function load (token) {
  if (!_char) {

    // Load character if not buffered
    _char = verify(token).then((r) => {
      return new Character(r.CharacterID, r.CharacterName)
    })

    // Add sub-promises

    _char.location = function () {
      return _char.then(function (c) {
        return c.location(token)
      })
    }

    _char.system = function () {
      return _char.location().then(function (l) {
        return l.system(token)
      })
    }
  }

  return _char
}

export function system (token) {
  return load(token)
    .then((c) => c.system(token))
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
