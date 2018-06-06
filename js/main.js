/** Main modules
 *
 * Tasks:
 *  - Load all components
 *  - Run UI
 *
 */

import * as esi from './esi.js'
import ui       from './ui.js'

// Run UI when everything's loaded
window.onload = async function () {

  await Promise.all([
    esi.load(),
  ])

  ui()
}
