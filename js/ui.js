import * as main    from './ui/main.js'
import * as login   from './ui/login.js'
import * as loading from './ui/loading.js'
import reset        from './ui/reset.js'

export { login, reset }

export function start (token) {

  // Show nothing but loading screen
  main.hide()
  loading.show()

  // Load UI async, return promise
  return main.load(token)
    .then(function () {

      // first hide everything that's not used atm
      login.hide()
      loading.hide()

      // then show main UI
      main.show()
    })
    .catch(function (response) {
      console.log("Error in ui.start:", response)
      reset(response.error)
    })
}
