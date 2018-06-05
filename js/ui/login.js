import * as esi from '../esi.js'

export function show (msg) {
  // get login element
  let login = document.querySelector("#login")

  // show it
  login.style.display = "block"

  // show message
  let notice = login.querySelector(".notice")
  if (msg) {
    notice.innerText = msg
    notice.style.display = "block"
  }
  else
    notice.style.display = "none"
}

export function hide () {
  let login = document.querySelector("#login")
  login.style.display = "none"

  let notice = login.querySelector(".notice")
  notice.style.display = "none"
  notice.innerText = ""
}

export function register () {
  document.querySelector("#login a").onclick = () => esi.login.open()
}
