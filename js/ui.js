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
    const [character, system] = await header.update()
    await main.update(character, system)
  }
  catch (e) {
    console.warn("Exception in ui.update:", e)
    stop()
    await main.reset("OFFLINE - You need to log in again to update the current view.")
  }
}

export async function reset (msg) {
  await Promise.all([
    header.reset(msg),
    main.reset(),
  ])
}
