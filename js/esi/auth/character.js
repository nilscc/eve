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

  async _location () {
    return request("characters/" + this.id + "/location/")
  }

  async system () {
    const l = await this._location()
    return universe.system(l.solar_system_id)
  }

  async isDocked () {
    const l = await this._location()
    return l.hasOwnProperty("structure_id")
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
    throw "No character available. Please log in:"
  return _char
}
