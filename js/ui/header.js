import * as esi  from '../esi.js'
import * as main from './main.js'

import title     from './header/title.js'

let _char

export async function init () {
}

export async function update () {

  const character = esi.auth.character.get()

  const system = await character.system()
  const docked = await character.isDocked()

  title(
    character.name,
    "Location: " + system.name + (docked ? " (docked)" : ""))

  return [_char, system]
}

export async function reset (msg) {
  if (!msg)
    msg = "Please log in:"
  title("Login", msg)
}
