export default class HorizontalTrack extends HTMLElement {
  constructor() {
    super()
    this.e = {
      container: document.createElement("div"),
      volume_range: document.createElement("volume-range"),
      input: document.createElement("input"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      style = document.createElement("style")

    style.textContent = this.style()
    this.e.container.classList.add("container")
    this.e.input.classList.add("label")
    this.e.volume_range.onchange = this.changeGain
    this.e.container.appendChild(this.e.input)
    this.e.container.appendChild(this.e.volume_range)
    shadow.appendChild(this.e.container)
    shadow.appendChild(style)
  }

  connectedCallback() {
    this.e.input.value = this.getAttribute("label")
  }
  changeGain(value) {
    console.log(value)
    globalThis.audioClass.masterGain.gain.value = value / 100
  }
  style = () => `
    .container{
      min-height: 50px;
      padding: 5px;
      border: solid 1px black;
    }
    .label{
      display: block;
      width: 100px;
    }
  `
}

customElements.define("horizontal-track", HorizontalTrack)
