ui = {}

ui.cleanup = function () {

  // helper
  function rm (el) {
    if (el) {
      el.remove()
    }
  }

  rm(document.querySelector("#login"))
  rm(document.querySelector("#loading"))
  rm(document.querySelector("#main"))
}

ui.loading = function () {
  ui.cleanup()

  let msg = document.createElement("p")
  msg.id = "loading"
  msg.appendChild(document.createTextNode("Loading..."))

  document.body.appendChild(msg)
}

ui.start = function () {
  // make sure everything's nice and tidy
  ui.cleanup()

  let header = document.createElement("h1")
  header.appendChild(document.createTextNode(character.name()))

  let subheader = document.createElement("h4")
  subheader.appendChild(document.createTextNode("Location: " + character.location.solarsystem()))

  let title = document.createElement("div")
  title.id = "title"
  title.appendChild(header)
  title.appendChild(subheader)

  let main = document.createElement("div")
  main.id = "main"
  main.appendChild(title)

  document.body.appendChild(main)
}
