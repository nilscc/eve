if (typeof esi === "undefined") {
  esi = {}
}

esi.request = function (path, cb, token) {
  let req = new XMLHttpRequest()

  if (!token)
  {
    token = g_access_token
  }

  let params = [
    "datasource=tranquility",
    "token=" + g_access_token,
  ]

  req.open("GET", "https://esi.evetech.net/latest/" + path + "?" + params.join("&"))

  req.onload = function () {
    cb(JSON.parse(this.response))
  }

  req.send()
}
