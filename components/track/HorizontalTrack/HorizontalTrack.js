export default class HorizontalTrack extends HTMLElement {
  constructor() {
    super()
    this.e = {
      volume_range: document.createElement("volume-range"),
      input: document.createElement("input"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      container = document.createElement("div"),
      style = document.createElement("style")

    style.textContent = this.style()
    container.classList.add("container")
    this.e.input.classList.add("label")
    this.e.volume_range.onchange = this.changeGain
    container.appendChild(this.e.input)
    container.appendChild(this.e.volume_range)
    shadow.appendChild(container)
    shadow.appendChild(style)
  }

  connectedCallback() {
    this.e.input.value = this.getAttribute("label")
  }
  changeGain(value) {
    globalThis.audioClass.masterGain.gain.value = value / 100
  }

  style = () => `
    .container{
      border: solid 1px black;
    }
    .label{
      display: block;
      width: 100px;
    }
  `
}

customElements.define("horizontal-track", HorizontalTrack)
