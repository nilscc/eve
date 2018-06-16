/** Main modules
 *
 * Tasks:
 *  - Load all components
 *  - Run UI
 *
 */

import * as esi from './esi.js'
import * as ui  from './ui.js'

// Run UI when everything's loaded
window.onload = async function () {

  try {

    await esi.init()
    await ui.init()

    try {
      ui.start()
    }
    catch (e) {
      console.warn("Exception in window.onload on ui.start:", e)
    }
  }
  catch (e) {
    console.warn("Exception in window.onload:", e)
    ui.reset("Failed to initialize.")
  }

}
