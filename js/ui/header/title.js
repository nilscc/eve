const _t = document.querySelector("header #title")
const _s = document.querySelector("header #subtitle")

export default function (title, subtitle) {
  if (!title) {
    return [_t.innerText, _s.innerText]
  } else {
    _t.innerText = title
    _s.innerText = subtitle
    if (subtitle)
      _s.style.display = "block"
    else
      _s.style.display = "none"
  }
}
