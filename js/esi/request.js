import * as auth from './auth.js'

function RequestException (message) {
  this.message = message
}

export default async function request (path, params=[], init={}) {

  const token = auth.token.require()

  params = params.concat([
    "datasource=tranquility",
    "token=" + token,
  ])

  const url = "https://esi.evetech.net/latest/" + path + "?" + params.join("&")

  const response = await fetch(url, init)

  switch (response.status)
  {
    case 200:
      return JSON.parse(await response.text())
    default:
      console.error(response)
      throw response
  }
}
