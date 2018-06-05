import verify from './esi/verify.js'
import { setCookie, getCookie } from './cookies.js'
import * as ui from './ui.js'

function registerLogin () {
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

  let fullUrl = url + "?" + encodeURI(params.join("&"))

  // Register global login handler
  document.querySelector("#login a").onclick = function () {
    console.log("click:", this)
    window.open(fullUrl, "_self");
  }
}

function getToken () {
  return new Promise(function (resolve, reject) {
    let currentUrl = new URL(window.location.href.replace(/#/, "?"))
    let token = currentUrl.searchParams.get("access_token")
    let expires = currentUrl.searchParams.get("expires_in")
    if (token && expires) {
      setCookie("access_token", token, expires - 60 /* subtract one minute */)
      window.open("/eve/", "_self")
    }
    else {
      let token = getCookie("access_token")
      if (token)
        resolve(token)
      else
        reject()
    }

  })
}

function main () {
  registerLogin()

  getToken()
    .then( ui.start )
    .catch(function (e) {
      console.log("Error in main:", e)
    })
}

// Run main() when everything's loaded
window.onload = main
