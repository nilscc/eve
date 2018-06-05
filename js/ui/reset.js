import * as login from './login.js'

// helper
function rm (el) {
  if (el) {
    el.remove()
  }
}

export default function reset (msg) {
  cleanup()
  login.show(msg)
}

export function cleanup () {
  rm(document.querySelector("#loading"))
}
