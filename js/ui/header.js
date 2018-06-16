import * as esi  from '../esi.js'
import * as main from './main.js'

import title     from './header/title.js'

let _char
let _loc

async function loadTitle () {

  // get current location
  _loc  = await _char.location()

  const system = await _loc.system()
  const docked = _loc.isDocked()

  title(
    _char.name,
    "Location: " + system.name + (docked ? " (docked)" : "")
  )

  return system
}

export async function init () {
  try {

    // Load character
    _char = esi.auth.character.get()

    // Show character name in title while loading full title
    title(
      _char.name,
      "Found your character, please wait."
    )

    await loadTitle()
  }
  catch (e) {
    // Set error message as subtitle
    title(null, e)
  }
}

export async function update () {

  // Info about location
  const system = await loadTitle()

  // return current character & system
  return [_char, system]
}

export async function reset (msg) {
  if (!msg)
    msg = "Please log in:"
  title("Login", msg)
}
