import * as esi  from '../../../esi.js'

function flatten(array) {
  return [].concat(...array)
}

function gates(_system) {
  return Promise.all(_system.stargates.map((gid) => esi.universe.stargate(gid)))
}

// Query all destination systems
function destinationSystems(_gates) {

  // get all unique destination system IDs
  const _systemIds = new Set(_gates.map(g => g.destination.system_id))

  return Promise.all(Array.from(_systemIds).map(id =>
    esi.universe.system(id)
  ))
}

export default async function (system, level, limit) {

  if (level < 0)
    return

  // Visited systems
  let systemIds = new Set([system.system_id])

  system.jumps = 0

  let solarsystems = new Set([system])
  let stargates = new Set()

  // Start with the current set of gates
  let _gates = await gates(system)

  for (let i = 0; (i < level) && (systemIds.size < limit); i++) {
    const jumps = i+1

    // Lookup neighbouring systems + gates
    const _systems = await destinationSystems(_gates)

    _gates = flatten(await Promise.all(_systems.map(s => gates(s))))

    // Add results

    _systems.forEach(s => {
      systemIds.add(s.system_id)

      // add current index as number of jumps
      s.jumps = jumps
      solarsystems.add(s)
    })

    _gates.forEach(g => {
      g.jumps = jumps
      stargates.add(g)
    })

    // Remove gates to already known systems for next iteration
    _gates = _gates.filter(g => !systemIds.has(g.destination.system_id))
  }

  // Load the final neighbour system set
  {
    const _systems = await destinationSystems(_gates)

    _systems.forEach(s => {
      systemIds.add(s.system_id)

      // add level as number of jumps
      s.jumps = level+1
      solarsystems.add(s)
    })
  }

  if (systemIds.size != solarsystems.size)
    throw "Invalid surroundings loaded."

  return [ solarsystems, stargates ]
}
