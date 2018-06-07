// Reexports

import * as esi from '../esi.js'

import * as login        from './main/login.js'
import * as status       from './main/status.js'
import * as surroundings from './main/surroundings.js'

export { login }

export function init (system) {

  // Register onclick() event for login page
  login.register()

}

let _surroundings

export async function update (character, system) {
  login.hide()

  if (!_surroundings) {
    // Load & visualize initial surroundings
    status.show("Loading surroundings...")
    _surroundings = await surroundings.load(system)
    status.hide()

    _surroundings.visualize()
  }
  else {
    _surroundings.update(system)
  }
}

export function reset () {
  surroundings.hide()
  login.show()
}
