import "../btn/MuteBtn/MuteBtn.js"
import "../btn/ChannelBtn/ChannelBtn.js"
import "./volume/VolumeRange.js"
import "../PanKnob/PanKnob.js"
import "../VolumeMeter/VolumeMeter.js"
export default class HorizontalTrack extends HTMLElement {
  constructor() {
    super()
    this.gainValue = null
    this.e = {
      volumeMeter: document.createElement("volume-meter"),
      volumeRange: document.createElement("volume-range"),
      panKnob: document.createElement("pan-knob"),
      muteBtn: document.createElement("mute-btn"),
      channelBtn: document.createElement("channel-btn"),
      input: document.createElement("input"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      container = document.createElement("div"),
      btnContainer = document.createElement("div"),
      inputContainer = document.createElement("div"),
      inputLeftContainer = document.createElement("div"),
      style = document.createElement("style")

    style.textContent = this.style()

    // onchangeh
    ;[
      [this.e.volumeRange, this.changeGain],
      [this.e.panKnob, this.changePan],
    ].forEach(([e, func]) => (e.onchange = func))

    // setAttribute
    ;[
      [this.e.input, [["type", "text"]]],
      [
        this.e.panKnob,
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
      [this.e.input, "label"],
      [btnContainer, "btn_container"],
      [inputContainer, "input_container"],
    ].forEach(([e, name]) => e.classList.add(name))

    // appendChild
    ;[
      [btnContainer, [this.e.muteBtn, this.e.channelBtn]],
      [inputLeftContainer, [this.e.input, this.e.volumeRange, btnContainer]],
      [inputContainer, [inputLeftContainer, this.e.panKnob]],
      [container, [inputContainer, this.e.volumeMeter]],
      [shadow, [container, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
  }

  connectedCallback() {
    this.e.input.value = this.getAttribute("label")
    this.e.muteBtn.gainValue = this.e.volumeRange.value / 100
  }

  changeGain = value => {
    if (this.e.muteBtn.hasAttribute("active")) {
      this.e.muteBtn.gainValue = value / 100
    } else {
      globalThis.audioClass.masterGain.gain.value = value / 100
    }
  }

  changePan = value => {
    globalThis.audioClass.panner.pan.value = value / 100
  }

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
