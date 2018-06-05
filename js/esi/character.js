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
    if (!this._location) {
      this._location = request(token, "characters/" + this.id + "/location/")
        .then(function (l) { return new Location(l) })

      // convenient
      this._location.system = function () {
        return promise.then(function (l) { return l.system(token) })
      }
    }

    return this._location
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
