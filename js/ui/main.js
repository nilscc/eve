// Reexports

import * as esi from '../esi.js'

import * as login        from './main/login.js'
import * as status       from './main/status.js'
import * as surroundings from './main/surroundings.js'

export { login }

// Boolean flag if main is currently active
let _active

export function init (system) {

  _active = false

  // Register onclick() event for login page
  login.register()
}

let _surroundings

export async function update (character, location) {
  login.hide()
  _active = true

  const system = await location.system()

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


export function reset (msg) {

  console.log("ui.main.reset", msg, _active)

  if (_active) {
    _active = false
    if (msg)
      status.show(msg)
  } else {
    status.hide()
  }

  login.show()
}
