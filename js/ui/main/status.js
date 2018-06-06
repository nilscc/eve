const elem = document.querySelector("main #status")

export function show (msg) {
  elem.style.display = "block"
  elem.innerText = msg
}

export function hide () { elem.style.display = "none" }
