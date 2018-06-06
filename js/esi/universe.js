import system        from './universe/system.js'
import stargate      from './universe/stargate.js'
import * as K from './universe/kills.js'

export {
  system,
  stargate,
}

export const kills = K.default()

export async function load () {
  await K.load()
}
