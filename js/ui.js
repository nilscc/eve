import * as header from './ui/header.js'
import * as main   from './ui/main.js'

export { header, main }

/*
 * UI Main Event Loop
 *
 */

const delay = s => new Promise(resolve => setTimeout(resolve, 1000 * s))

let _run = false

export async function start () {
  _run = true
  console.log("UI started.")
  while (_run) {
    try {
      await update()
      await delay(20)
    }
    catch (e) {
      console.error(e)
      stop()
    }
  }
  console.log("UI stopped.")
}

export function stop () {
  _run = false
}

/*
 * UI Control Functions
 *
 */

export async function init () {
  await Promise.all([
    main.init(),
    header.init(),
  ])
}

export async function update () {
  try {

    const character = esi.auth.character.get()

    let _attempts = 5
    while (_attempts --> 0)
      try {

        // Get current character location
        const location  = await character.location()

        await header.update(character, location)
        await main.update(character, location)

        // exit while loop
        break

      } catch (e) {
        if (e.hasOwnProperty("status"))
          switch (e.status) {
            case 504: {
              console.warn(e)
              continue
            }
          }
        console.error(e)
        throw e
      }

  } catch (e) {

    console.warn("Exception in ui.update:", e)
    stop()

    // Check response status
    let msg
    if (e.hasOwnProperty("status"))
      switch (e.status) {
        case 401: {
          await header.reset("OFFLINE - You need to log in again to update the current view.")
          break
        }
      }
    else if (e.hasOwnProperty("message"))
      msg = e.message

    await main.reset(msg)
  } // catch
}

export async function reset (msg) {
  await Promise.all([
    header.reset(msg),
    main.reset(),
  ])
}
