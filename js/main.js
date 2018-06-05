/** Main modules
 *
 * Tasks:
 *  - Establish ESI connection by requiring a valid token
 *  - Load all UI elements
 *  - Reset to default on error and show login page
 *
 */

import * as ui  from './ui.js'
import * as esi from './esi.js'

// Run main() when everything's loaded
window.onload = function () {

  // Register onclick() event for login page
  ui.login.register()

  // Load token (if available) and start UI
  esi.token()
    .then( ui.start )
    .catch(function (e) {
      ui.reset()
      ui.login.show(e.toString())
    })
}
