import * as login from './login.js'
import * as reset from './reset.js'

export function show () {
  console.log("Show loading")

  login.hide()
  reset.cleanup()

  let msg = document.createElement("p")
  msg.id = "loading"
  msg.appendChild(document.createTextNode("Loading..."))

  document.body.appendChild(msg)
}

export function hide () {
}
