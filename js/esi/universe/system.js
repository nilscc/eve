import request from '../token/request.js'

let _lookup = {}

export default function system (token, system_id) {
  return new Promise(function (resolve, reject) {
    if (_lookup.hasOwnProperty(system_id))
      resolve(_lookup[system_id])
    else
      request(token, "universe/systems/" + system_id + "/")
        .then(function (s) {
          resolve(_lookup[s.system_id] = s)
        })
        .catch(reject)
  })
}
