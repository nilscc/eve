import request from './esi/request.js'

export default class Location {
  constructor(loc) {
    console.log("new Location:", loc)

    this.system_id = loc.solar_system_id
    if (loc.hasOwnProperty("structure_id"))
      this.structure_id = loc.structure_id
  }

  /*
   * Solar system
   *
   */

  system (token) {
    return request(token, "universe/systems/" + this.system_id + "/")
  }

  /*
   * Structures
   *
   */

  isDocked () {
    return this.hasOwnProperty("structure_id")
  }

  structure (token) {
    return request(token, "universe/structures/" + this.structure_id + "/")
  }
}
