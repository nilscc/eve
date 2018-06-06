import * as auth      from './esi/auth.js'
import * as universe  from './esi/universe.js'

// Re-exports
export {
  auth,
  universe,
}

export function load () {
  universe.load()
}
