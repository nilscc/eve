import request from '../request.js'

export async function waypoint(destination_id, add_to_beginning=false, clear_other_waypoints=false) {
  console.log("Set waypoint to:", destination_id)

  const params = [
      "destination_id=" + destination_id,
      "add_to_beginning=" + add_to_beginning,
      "clear_other_waypoints=" + clear_other_waypoints,
  ]

  const init = {
    method: "POST",
  }

  const r = await request("ui/autopilot/waypoint/", params, init)

  console.log(r)
}
