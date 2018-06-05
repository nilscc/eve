import request        from '../token/request.js'
import * as universe  from './system.js'

export class Gate {
  constructor(gate) {
    this._gate = gate
  }

  system(token) {
    return universe.system(token, this._gate.destination.system_id)
  }
}

export default function stargate (token, stargate_id) {
  return request(token, "universe/stargates/" + stargate_id + "/")
    .then((r) => new Gate(r))
}
