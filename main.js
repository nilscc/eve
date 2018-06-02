function login () {
  let client_id = "65ff72c0a6eb4be58de265d9ee8a30db"
  let redirect_uri = "https://nils.cc/eve/"
  let scopes = "esi-location.read_location.v1 esi-bookmarks.read_character_bookmarks.v1 esi-ui.write_waypoint.v1"

  let url = "https://login.eveonline.com/oauth/authorize/"
  let params = [
    "response_type=token",
    "redirect_uri=" + redirect_uri,
    "client_id=" + client_id,
    "scope=" + scopes,
  ]

  window.open(url + "?" + encodeURI(params.join("&")), "_self");
}

let g_access_token

function requireToken() {
  if (!g_access_token) {
    throw new Error("Access token required.")
  }
}

function main () {
  let currentUrl = new URL(window.location.href.replace(/#/, "?"))
  let token = currentUrl.searchParams.get("access_token")
  if (token)
  {
    g_access_token = token

    ui.loading()

    // load character
    character.load_id(function () {
      character.load_location(function () {
        // load UI
        ui.start()
      })
    })
  }
}
