import * as token from './token.js'

export default async function () {

  // require current token
  const t = token.require()

  // define headers
  let h = new Headers()

  h.append("Authorization", "Bearer " + t)

  // fetch API result
  const r = await fetch("https://esi.tech.ccp.is/verify/", {
    headers: h
  })

  if (!r.ok)
    throw "Verification failed. Please log in:"

  return JSON.parse(await r.text())
}
