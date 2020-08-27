import "../btn/MuteBtn.js"
import "./volume/VolumeRange.js"
export default class HorizontalTrack extends HTMLElement {
  constructor() {
    super()
    this.gainValue = null
    this.e = {
      volume_range: document.createElement("volume-range"),
      mute_btn: document.createElement("mute-btn"),
      input: document.createElement("input"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      container = document.createElement("div"),
      btn_container = document.createElement("div"),
      style = document.createElement("style")

    this.e.input.setAttribute("type", "text")
    style.textContent = this.style()
    container.classList.add("container")
    this.e.input.classList.add("label")
    this.e.volume_range.onchange = this.changeGain

    btn_container.appendChild(this.e.mute_btn)
    ;[this.e.input, btn_container, this.e.volume_range].forEach(e =>
      container.appendChild(e)
    )
    ;[container, style].forEach(e => shadow.appendChild(e))
  }

  connectedCallback() {
    this.e.input.value = this.getAttribute("label")
    this.e.mute_btn.gainValue = this.e.volume_range.value / 100
  }

  changeGain = value => {
    if (this.e.mute_btn.hasAttribute("active")) {
      this.e.mute_btn.gainValue = value / 100
    } else {
      globalThis.audioClass.masterGain.gain.value = value / 100
    }
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
