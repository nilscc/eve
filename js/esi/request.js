import * as auth from './auth.js'

function RequestException (message) {
  this.message = message
}

export default async function request (path) {

  const params = [
    "datasource=tranquility",
    "token=" + auth.token.require(),
  ].join("&")

  const url = "https://esi.evetech.net/latest/" + path + "?" + params

  const response = await fetch(url)

  switch (response.status)
  {
    case 200:
      return JSON.parse(await response.text())
    default:
      console.error(response)
      throw response
  }
}
