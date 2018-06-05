/** The main token promise
 *
 */

import { getCookie, setCookie } from '../cookies.js'

export default function token () {
  return new Promise(function (resolve, reject) {

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
      const token = getCookie("access_token")
      if (token)
        resolve(token)
      else
        reject("No token available. Please log in.")
    }
  })
}
