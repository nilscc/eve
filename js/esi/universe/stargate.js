import request  from '../token/request.js'
import * as SYS from './system.js'

export default function stargate (token, stargate_id) {
  return request(token, "universe/stargates/" + stargate_id + "/")
}
