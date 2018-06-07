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
  while (_run) {
    try {
      await update()
      await delay(10)
    }
    catch (e) {
      console.error(e)
      stop()
    }
  }
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
    main.login.hide()
    const [character, system] = await header.update()
    await main.update(character, system)
  }
  catch (e) {
    console.warn("Exception in ui.update:", e)
    await reset(e)
  }
}

export async function reset (msg) {
  await Promise.all([
    header.reset(msg),
    main.reset(),
  ])
}
