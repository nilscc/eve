export default function verify(token, cb) {
  return new Promise(function (resolve, reject) {
    // setup 'verify' request
    let req = new XMLHttpRequest()
    req.open("GET", "https://esi.tech.ccp.is/verify/")
    req.setRequestHeader("Authorization", "Bearer " + token)
    req.onerror = reject
    req.onload = function () {
      if (this.status == 200)
        resolve(JSON.parse(this.response))
      else
        reject.call(this)
    }
    req.send()
  })
}
