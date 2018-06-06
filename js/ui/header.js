import * as esi   from '../esi.js'

import title from './header/title.js'

export default async function () {

  try {
    const c = await esi.auth.character()
    const s = await c.system()
    const d = await c.isDocked()

    title(
      c.name,
      "Location: " + s.name + (d ? " (docked)" : ""))

  }
  catch (e) {
    console.log(e)
  }
}
