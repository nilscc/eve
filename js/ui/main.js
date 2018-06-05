// Reexports

import * as header       from './main/header.js'
import * as surroundings from './main/surroundings.js'

export { header, surroundings }

export function load (token) {
  return Promise.all([
    header.load(token),
    surroundings.load(token),
  ])
}

/*
 * DOM manamgement
 *
 */

let _main
function main () {
  if (_main)
    return _main
  else
    return _main = document.querySelector("#main")
}

export function show () {
  main().style.display = "block"
}

export function hide () {
  main().style.display = "none"
}
