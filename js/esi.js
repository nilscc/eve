import * as auth      from './esi/auth.js'
import * as universe  from './esi/universe.js'
import * as ui        from './esi/ui.js'

// Re-exports
export {
  auth,
  universe,
  ui,
}

export async function init () {
  await Promise.all([
    universe.init(),
    auth.init(),
  ])
}
