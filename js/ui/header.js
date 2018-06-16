import * as esi  from '../esi.js'
import * as main from './main.js'

import title     from './header/title.js'

let _char
let _loc

async function loadTitle (character, location) {
}

export async function init () {
  try {

    // Load character
    const character = esi.auth.character.get()

    // Show character name in title while loading full title
    title(
      character.name,
      "Found your character, please wait."
    )
  }
  catch (e) {
    // Set error message as subtitle
    title(null, e)
  }
}

export async function update (character, location) {

  // load current system
  const system = await location.system()
  const docked = location.isDocked()

  title(
    character.name,
    "Location: " + system.name + (docked ? " (docked)" : "")
  )
}

export async function reset (msg) {
  title(null, msg)
}
