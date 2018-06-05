import request from './esi/request.js'

export default class Location {
  constructor(loc) {
    console.log(loc)
    this._loc = loc
  }

  system (token) {
    return request(token, "universe/systems/" + this.system_id + "/")
  }
}
