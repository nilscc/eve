/** The main token promise
 *
 */

import { getCookie, setCookie } from '../../cookies.js'

export function require () {

  // Check if there is a new token in the GET parameters
  const currentUrl = new URL(window.location.href.replace(/#/, "?"))
  const token = currentUrl.searchParams.get("access_token")
  const expires = currentUrl.searchParams.get("expires_in")
  if (token && expires) {
    setCookie("access_token", token, expires - 60 /* subtract one minute */)
    window.open("/eve/", "_self")
  }
  else {
    // Check if there is a valid cookie
    return getCookie("access_token")
  }
}
