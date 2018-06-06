import request from '../request.js'

class k {
  constructor (npc, pod, ship) {
    this.npc = npc
    this.pod =  pod
    this.ship = ship
  }
}

// Buffer results
let buf = {}

// Global promise
const _r = request("universe/system_kills/")

export async function load () {

  const r = await _r

  r.forEach((sys) =>
    buf[sys.system_id] = new k(sys.npc_kills, sys.pod_kills, sys.ship_kills)
  )
}

export default function (system_id) {
  // Lookup kills with default fallback
  return system_id => buf.hasOwnProperty(system_id)
    ? buf[system_id]
    : new k(0, 0, 0)
}
