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

    this.e.input.setAttribute("type", "text")
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
      padding: 10px;
      background: #666666;
      border: solid 1px #777777;
    }
    volume-range{
      margin: 5px;
    }
    .label{
      display: block;
      width: 200px;
      margin: 5px;
      color: white;
      background: #424242;
    }
  `
}

customElements.define("horizontal-track", HorizontalTrack)
