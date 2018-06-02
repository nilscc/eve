character = {}

/*
 * Identity
 *
 */

character.load_id = function (cb) {
  requireToken()

  let req = new XMLHttpRequest()

  // the URL
  req.open("GET", "https://esi.tech.ccp.is/verify/")

  req.setRequestHeader("Authorization", "Bearer " + g_access_token)

  req.onload = function () {
    character._id = JSON.parse(this.response)

    if (cb)
      cb()
  }

  req.send()
}

character._requireId = function () {
  if (!character._id) {
    throw new Error("Character ID not loaded.")
  }
}

character.name = function () {
  character._requireId()
  return character._id.CharacterName
}

character.id = function () {
  character._requireId()
  return character._id.CharacterID
}


/*
 * Location
 *
 */

character.load_location = function (cb) {
  requireToken()

  let id = character.id()

  esi.request("characters/" + id + "/location/", function (response) {
    character._location = response

    let system_id = response.solar_system_id

    // get more information about solar system
    esi.request("universe/systems/" + system_id + "/", function (r) {
      character._location.solar_system = r
      cb()
    })
  })
}


character._requireLocation = function () {
  if (!character._location) {
    throw new Error("Character location not loaded.")
  }
}

character.location = {}

character.location.solarsystem = function () {
  character._requireLocation()
  return character._location.solar_system.name
}
