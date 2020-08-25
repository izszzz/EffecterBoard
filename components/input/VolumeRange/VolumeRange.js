export default class VolumeRange extends HTMLElement {
  constructor() {
    super()
    this._gain = null
    this.e = {
      container: document.createElement("div"),
      range: document.createElement("input"),
      input: document.createElement("input"),
      style: document.createElement("style"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      style = document.createElement("style")
    style.textContent = this.style()
    this.e.container.classList.add("container")
    this.e.range.setAttribute("type", "range")
    this.e.range.setAttribute("min", 0)
    this.e.range.setAttribute("max", 150)
    this.e.range.setAttribute("value", 100)
    this.e.range.addEventListener("input", this.changeGain)
    this.e.input.setAttribute("type", "number")
    this.e.input.setAttribute("min", 0)
    this.e.input.setAttribute("max", 150)
    this.e.input.setAttribute("value", 100)
    this.e.input.addEventListener("input", this.changeGain)
    this.e.container.appendChild(this.e.input)
    this.e.container.appendChild(this.e.range)
    shadow.appendChild(this.e.container)
    shadow.appendChild(this.e.style)
  }

  get gain() {
    return this._gain
  }
  set gain(val) {
    this._gain = val
  }

  changeGain = e => {
    const value = e.currentTarget.value
    this.gain.value = value / 100
    this.e.input.value = value
    this.e.range.value = value
  }

  style = () => `
  input[type=number]{
    width: 5px;
  }
  `
}

customElements.define("volume-range", VolumeRange)
