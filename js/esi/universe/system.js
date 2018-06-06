import request from '../request.js'

export default function system (system_id) {
  return request("universe/systems/" + system_id + "/")
}
