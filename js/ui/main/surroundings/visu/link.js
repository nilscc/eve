export default class Link {
  constructor(gate, value) {
    const s1 = gate.system_id,
          s2 = gate.destination.system_id

    this.source = Math.min(s1, s2)
    this.target = Math.max(s1, s2)

    if (!value)
      value = 5
    this.value = value
  }
}
