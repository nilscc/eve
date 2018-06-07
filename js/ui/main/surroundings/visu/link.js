export default class Link {
  constructor(gate, value) {
    const s1 = gate.system_id,
          s2 = gate.destination.system_id

    this.source = Math.min(s1, s2)
    this.target = Math.max(s1, s2)

    if (!value)
      value = 5
    this.value = value

    this.jumps = gate.jumps
  }

  strength () {
    return 0.5
  }

  distance () {
    return 1 / (2 * Math.exp(- Math.max(1, this.jumps)))
  }

  width () {
    return 3 / Math.max(1, this.jumps)
  }

  classes () {
    return [
      "jumps-" + this.jumps
    ].join(" ")
  }
}
