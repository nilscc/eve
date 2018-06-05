import { setCookie } from './cookies.js'

import * as character from './character.js'

import * as system from './ui/system.js'

// helper
function rm (el) {
  if (el) {
    el.remove()
  }
}

function showLogin (msg) {
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

function hideLogin () {
  let login = document.querySelector("#login")
  login.style.display = "none"

  let notice = login.querySelector(".notice")
  notice.style.display = "none"
  notice.innerText = ""
}

function reset (msg) {
  cleanup()
  showLogin(msg)
}

function cleanup () {
  rm(document.querySelector("#loading"))
}

function showLoading () {
  hideLogin()
  cleanup()

  let msg = document.createElement("p")
  msg.id = "loading"
  msg.appendChild(document.createTextNode("Loading..."))

  document.body.appendChild(msg)
}

function loadHeader (token) {

  function run(c, l) {
    cleanup()

    let header = document.createElement("h1")
    header.appendChild(document.createTextNode(c.name))

    let subheader = document.createElement("h4")
    subheader.appendChild(document.createTextNode("Location: " + l.name))

    let title = document.createElement("div")
    title.id = "title"
    title.appendChild(header)
    title.appendChild(subheader)

    let main = document.querySelector("#main")
    main.appendChild(title)

    document.body.appendChild(main)
  }

  // Load data and return promise
  return character.load(token).then(function (c) {
    console.log("Char:", c)
    return c.location(token).then(function (l) {
      console.log("Location:", l)
      run(c, l)
    })
  })
}

/*
ui._loadSurroundings = function () {

  // Main container for surroundings
  let cont = document.createElement("div")
  cont.id = "surroundings"
  document.querySelector("#main").appendChild(cont)

  // Setup elements
  let appendNPC = (function () {

    let table = document.createElement("table")
    table.id = "NPC_kills"

    cont.appendChild(table)

    // add table header
    let th_left = document.createElement("th")
    th_left.appendChild(document.createTextNode("System"))
    let th_right = document.createElement("th")
    th_right.appendChild(document.createTextNode("NPC kills"))
    let tr_hdr = document.createElement("tr")
    tr_hdr.appendChild(th_left)
    tr_hdr.appendChild(th_right)

    table.appendChild(tr_hdr)

    return function(kills, system) {
      let td1 = document.createElement("td")
      td1.appendChild(ui.system.render(system))

      let td2 = document.createElement("td")
      td2.appendChild(document.createTextNode(kills.npc_kills))

      let tr  = document.createElement("tr")
      tr.appendChild(td1)
      tr.appendChild(td2)

      table.appendChild(tr)
    }
  })()

  let appendPlayer = (function () {

    let table = document.createElement("table")
    table.id = "Player_kills"

    cont.appendChild(table)

    // add table header
    let th1 = document.createElement("th")
    th1.appendChild(document.createTextNode("System"))
    let th2 = document.createElement("th")
    th2.appendChild(document.createTextNode("Ship kills"))
    let th3 = document.createElement("th")
    th3.appendChild(document.createTextNode("Pod kills"))
    let tr_hdr = document.createElement("tr")
    tr_hdr.appendChild(th1)
    tr_hdr.appendChild(th2)
    tr_hdr.appendChild(th3)

    table.appendChild(tr_hdr)

    return function(kills, system) {
      let td1 = document.createElement("td")
      td1.appendChild(ui.system.render(system))
      let td2 = document.createElement("td")
      td2.appendChild(document.createTextNode(kills.ship_kills))
      let td3 = document.createElement("td")
      td3.appendChild(document.createTextNode(kills.pod_kills))

      let tr  = document.createElement("tr")
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)

      table.appendChild(tr)
    }
  })()

  // Load surrounding systems
  let systems = []
  character.load_surroundings(function () {

    // send request to load kills
    esi.universe.load_system_kills(function () {

      // Add number of kills to nearby solar systems
      let systemKills = []
      for (var i in systems) {
        let kills = esi.universe.system_kills(systems[i].system_id)
        systemKills.push({
          "system": systems[i],
          "kills": kills,
        })
      }

      // Sort by number of NPC kills
      let cmpNPC = function (a, b) {
        return a.kills.npc_kills - b.kills.npc_kills
      }
      let sortedNPC = systemKills.sort(cmpNPC).reverse().filter(el => el.kills.npc_kills > 0)
      for (var i in sortedNPC) {
        appendNPC(sortedNPC[i].kills, sortedNPC[i].system)
      }

      // Sort by number of player kills
      let cmpPlayer = function (a, b) {
        return (a.kills.ship_kills + a.kills.pod_kills) - (b.kills.ship_kills + b.kills.pod_kills)
      }
      let sortedPlayer = systemKills.sort(cmpPlayer).reverse().filter(el => (el.kills.ship_kills + el.kills.pod_kills) > 0)
      for (var i in sortedPlayer) {
        appendPlayer(sortedPlayer[i].kills, sortedPlayer[i].system)
      }

    })

    // merge all surrounding systems into one array
    for (var i in character.surroundings) {
      for (var j in character.surroundings[i]) {
        let system = character.surroundings[i][j]
        if (system.security_status < 0.45)
          systems.push(system)
      }
    }
  })
}
*/

export function start (token) {
  showLoading()

  loadHeader(token).catch(function (response) {
    reset(response.error)
  })
}
