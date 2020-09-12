import "../btn/MuteBtn/MuteBtn.js"
import "../btn/ChannelBtn/ChannelBtn.js"
import "./volume/VolumeRange.js"
import "../PanKnob/PanKnob.js"
import "../VolumeMeter/VolumeMeter.js"
export default class HorizontalTrack extends HTMLElement {
  constructor() {
    super()
    this.gainValue = null
    const shadow = this.attachShadow({ mode: "open" })
    let container, btnContainer, inputContainer, inputLeftContainer, style
    ;[
      this.volumeMeter,
      this.volumeRange,
      this.panKnob,
      this.muteBtn,
      this.channelBtn,
      this.input,
      container,
      btnContainer,
      inputContainer,
      inputLeftContainer,
      style,
    ] = [
      "volume-meter",
      "volume-range",
      "pan-knob",
      "mute-btn",
      "channel-btn",
      "input",
      ...Array(4).fill("div"),
      "style",
    ].map(tag => document.createElement(tag))

    style.textContent = this.style()

    // onchangeh
    ;[
      [this.volumeRange, this.changeGain],
      [this.panKnob, this.changePan],
    ].forEach(([e, func]) => (e.onchange = func))

    // setAttribute
    ;[
      [this.input, [["type", "text"]]],
      [
        this.panKnob,
        [
          ["label", "pan"],
          ["max", 100],
          ["min", -100],
          ["value", 0],
        ],
      ],
    ].forEach(([parent, children]) =>
      children.forEach(([key, value]) => parent.setAttribute(key, value))
    )

    // add classList
    ;[
      [container, "container"],
      [this.input, "label"],
      [btnContainer, "btn_container"],
      [inputContainer, "input_container"],
    ].forEach(([e, name]) => e.classList.add(name))

    // appendChild
    ;[
      [btnContainer, [this.muteBtn, this.channelBtn]],
      [inputLeftContainer, [this.input, this.volumeRange, btnContainer]],
      [inputContainer, [inputLeftContainer, this.panKnob]],
      [container, [inputContainer, this.volumeMeter]],
      [shadow, [container, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
  }

  connectedCallback() {
    this.input.value = this.getAttribute("label")
    this.muteBtn.gainValue = this.volumeRange.value / 100
  }

  changeGain = val => {
    if (this.muteBtn.hasAttribute("active")) {
      this.muteBtn.gainValue = val / 100
    } else {
      globalThis.audioClass.masterGain.gain.value = val / 100
    }
  }

  changePan = val => 
    globalThis.audioClass.panner.pan.value = val / 100
  

  style = () => `
    .container{
      display: flex;
      background: #666666;
      border: solid 1px #777777;
    }
    section{
      margin: 5px;
      width: 200px;
    }
    .input_container{
      display: flex;
      margin: 10px;
    }
    .btn_container{
      width: 200px;
      margin: 3px 0;
    }
    .btn_container > * {
      margin-right: 3px;
    }
    .label{
      display: block;
      width: 200px;
      margin: 0;
      color: var(--text-invert-color);
      background: var(--input-bg-color);
      font-size: var(--font-size-normal);
    }
  `
}

customElements.define("horizontal-track", HorizontalTrack)
