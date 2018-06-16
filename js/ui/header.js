import * as esi  from '../esi.js'
import * as main from './main.js'

import title     from './header/title.js'

let _char
let _loc

export async function init () {
}

export async function update () {

  const character = esi.auth.character.get()

  try {
    // get current character location
    _loc = await character.location()

    // Info about location
    const system = await _loc.system()
    const docked = _loc.isDocked()

    // Set UI title
    title(
      character.name,
      "Location: " + system.name + (docked ? " (docked)" : ""))

    return [_char, system]
  }
  catch (e) {
    console.error("Exception in ui/header.js", e)
    throw e
  }
}

export async function reset (msg) {
  if (!msg)
    msg = "Please log in:"
  title("Login", msg)
}
