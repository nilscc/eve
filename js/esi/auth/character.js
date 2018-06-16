import request  from '../request.js'
import verify   from './verify.js'

import * as universe from '../universe.js'

/*
 * Identity
 *
 */

export class Character {
  constructor(id, name) {
    this.id = id
    this.name = name
  }

  async location () {
    const loc = await request("characters/" + this.id + "/location/")
    return new Location(loc)
  }
}

export class Location {
  constructor(loc) {
    this._loc = loc
  }

  async system () {
    return await universe.system(this._loc.solar_system_id)
  }

  isDocked () {
    const l = this._loc
    return l.hasOwnProperty("station_id") || l.hasOwnProperty("structure_id")
  }
}

let _char
export async function init () {
  try {
    const r = await verify()
    _char = new Character(r.CharacterID, r.CharacterName)
  }
  catch (e) {
    console.warn("Error in esi.auth.character:", e)
  }
}

export function get () {
  if (!_char)
    throw "No character available. Please log in."
  return _char
}
