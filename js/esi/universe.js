if (typeof esi === "undefined") {
  esi = {}
}

esi.universe = {}

esi.universe.load_system_kills = function (cb) {
  esi.request("universe/system_kills/", function (kills) {
    let bySystem = {}
    for (var i in kills) {
      let kill = kills[i]
      bySystem[kills[i].system_id] = {
        "npc_kills": kill.npc_kills,
        "pod_kills": kill.pod_kills,
        "ship_kills": kill.ship_kills,
      }
    }

    esi.universe.system_kills = function (system_id) {
      return bySystem.hasOwnProperty(system_id) ? bySystem[system_id] : { "npc_kills": 0, "pod_kills": 0, "ship_kills": 0 }
    }

    // done
    if (cb)
      cb()
  })
}

esi.universe.load_system = function (system_id, cb) {
  esi.request("universe/systems/" + system_id + "/", cb)
}

esi.universe.load_stargate = function (stargate_id, cb) {
  esi.request("universe/stargates/" + stargate_id + "/", function (r) {
    esi.universe.load_system(r.destination.system_id, function (s) {
      cb(r, s)
    })
  })
}
