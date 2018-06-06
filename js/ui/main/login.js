import * as esi from '../../esi.js'

const elem = document.querySelector("main #login")

export function show () { login.style.display = "block" }
export function hide () { login.style.display = "none" }

export function register () {
  elem.querySelector("a").onclick = () => esi.auth.login.open()
}
