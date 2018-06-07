export default class Node {

  constructor(system, group) {
    this.system = system

    if (!group)
      group = 2
    this.group = group

    // lookup system kills
    this.kills = esi.universe.kills(system.system_id)

    this.jumps = system.jumps
  }

  charge () {
    return this.jumps < 1 ? 0 : -50 // (-50 * Math.sqrt(this.jumps))
  }

  radius () {
    return 50 * this.jumps
  }

  _x () {
    return this.x
  }

  _y () {
    return this.y
  }

  id () {
    return this.system.system_id
  }

  title() {
    return this.system.name + " (" + this.system.security_status.toFixed(2) + ")"
  }

  color() {

    if (this.kills.pod + this.kills.ship > 0)
      return d3.color("red")
    else if (this.kills.npc > 100)
      return d3.color("lightgreen")
    else if (this.kills.npc > 0)
      return d3.color("green")

    // Default value
    return d3.scaleOrdinal(d3.schemeCategory20)(this.group)
  }

  size() {
    return 5
  }

  classes () {
    const s = Math.max(0, this.system.security_status).toFixed(1)
    return [
      "sec-" + s.split(".").join(""),
      "jumps-" + this.jumps,
    ].join(" ")
  }
}
