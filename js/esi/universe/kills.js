import request from '../token/request.js'
import * as sys from './system.js'

export class KillStatistics {
  constructor(kills) {
    if (!kills)
      kills = { "npc_kills": 0, "pod_kills": 0, "ship_kills": 0 }

    this.npc       = kills.npc_kills
    this.pod       = kills.pod_kills
    this.ship      = kills.ship_kills
  }
}

let _kills

export default function kills (token) {
  return new Promise(function (resolve, reject) {
    if (_kills) // TODO: store & check age
      resolve(_kills)
    else
      request(token, "universe/system_kills/")
        .then(function (system_kills) {

          // Sort elements by system ID
          let bySystem = {}
          for (const i in system_kills) {
            bySystem[system_kills[i].system_id] = new KillStatistics(system_kills[i])
          }

          // Resolve with lookup function and buffer result for next request
          resolve(_kills = function (system_id) {
            return bySystem.hasOwnProperty(system_id)
              ? bySystem[system_id]
              : new KillStatistics()
          })
        })
        .catch(reject)
  })
}
