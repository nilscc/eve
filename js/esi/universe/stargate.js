import request  from '../request.js'

export default function stargate (stargate_id) {
  return request("universe/stargates/" + stargate_id + "/")
}
