// Reexports

import * as esi from '../esi.js'

import header            from './header.js'

import * as status       from './main/status.js'
import * as login        from './main/login.js'
import * as surroundings from './main/surroundings.js'

export default async function () {

  // Register onclick() event for login page
  login.register()

  try {
    const character = await esi.auth.character()
    status.show("Loading...")
    login.hide()

    // Wait for all UI elements to load
    await surroundings.load(await character.system())
    surroundings.visualize()

    status.hide()
    surroundings.show()
  }
  catch (e) {
    console.log(e)
    status.show(e.toString())
    login.show()
  }
}
