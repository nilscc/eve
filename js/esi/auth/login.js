// API login information

const client_id    = "65ff72c0a6eb4be58de265d9ee8a30db"
const redirect_uri = "https://nils.cc/eve/"
const scopes       = [
  "esi-location.read_location.v1",
  "esi-bookmarks.read_character_bookmarks.v1",
  "esi-ui.write_waypoint.v1",
]

// Build the full URL
function url () {
  const url = "https://login.eveonline.com/oauth/authorize/"
  const params = [
    "response_type=token",
    "redirect_uri=" + redirect_uri,
    "client_id=" + client_id,
    "scope=" + scopes.join(" "),
  ]
  return url + "?" + encodeURI(params.join("&"))
}

// Open login page
export function open (target) {
  if (!target)
    target = "_self"
  return window.open(url(), target)
}
