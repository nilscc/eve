export function render (system) {
  let fixed = system.security_status.toFixed(1)
  let secstat = document.createElement("span")
  secstat.appendChild(document.createTextNode(fixed))

  // figure out security class (for coloring)
  let secClass
  if (system.security_status <= 0) {
    secClass = "00"
  }
  else {
    secClass = fixed.slice(-3,1) + fixed.slice(-1)
  }
  secstat.className = "sec-" + secClass

  let sys = document.createElement("div")
  sys.className = "solar_system"

  sys.appendChild(document.createTextNode(system.name + " ("))
  sys.appendChild(secstat)
  sys.appendChild(document.createTextNode(")"))

  return sys
}
