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

// Global verify promise
const _v = verify()

export default async function () {
  const r = await _v
  return new Character(r.CharacterID, r.CharacterName)
}
