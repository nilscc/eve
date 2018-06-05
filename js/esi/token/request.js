export default function request (token, path) {
  return new Promise(function (resolve, reject) {

    if (!token)
      reject("Missing token.")

    const params = [
      "datasource=tranquility",
      "token=" + token,
    ]

    const req = new XMLHttpRequest()
    req.open("GET", "https://esi.evetech.net/latest/" + path + "?" + params.join("&"))
    req.onload = function () {
      const response = JSON.parse(this.response)
      if (this.status == 200)
        resolve(response)
      else
        reject(response)
    }
    req.onerror = function (e) {
      reject({ "error": e })
    }
    req.send()
  })
}
