import * as reset from '../reset.js'
import * as esi   from '../../esi.js'

function rmChildren(el) {
  while (el.firstChild)
    el.removeChild(el.firstChild)
}

export function load (token) {

  function createElements(c, s, isDocked) {
    reset.cleanup()

    let header = document.createElement("h1")
    header.appendChild(document.createTextNode(c.name))

    let subheader = document.createElement("h4")
    subheader.innerText = "Location: " + s.name + (isDocked ? " (docked)" : "")

    let title = document.querySelector("#main #title")
    rmChildren(title)
    title.appendChild(header)
    title.appendChild(subheader)

    document.body.appendChild(main)
  }

  // Load data and return promise
  return esi.character.load(token)
    .then(function (c) {
      return c.location(token)
        .then(function (l) {
          return l.system(token)
            .then(function (s) {
              createElements(c, s, l.isDocked())
            })
        })
    })
}
