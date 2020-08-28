import "../btn/MuteBtn/MuteBtn.js"
import "../btn/ChannelBtn/ChannelBtn.js"
import "./volume/VolumeRange.js"
import "../PanKnob/PanKnob.js"
export default class HorizontalTrack extends HTMLElement {
  constructor() {
    super()
    this.gainValue = null
    this.e = {
      volume_range: document.createElement("volume-range"),
      pan_knob: document.createElement("pan-knob"),
      mute_btn: document.createElement("mute-btn"),
      channel_btn: document.createElement("channel-btn"),
      input: document.createElement("input"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      container = document.createElement("div"),
      section = document.createElement("section"),
      btn_container = document.createElement("div"),
      input_container = document.createElement("div"),
      input_left_container = document.createElement("div"),
      style = document.createElement("style")

    style.textContent = this.style()
    this.e.volume_range.onchange = this.changeGain
    this.e.pan_knob.onchange = this.changePan

    // setAttribute
    ;[
      [this.e.input, [["type", "text"]]],
      [this.e.pan_knob, [["label", "pan"]]],
      [
        this.e.pan_knob,
        [
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
      [btn_container, "btn_container"],
      [input_container, "input_container"],
    ].forEach(([e, name]) => e.classList.add(name))

    // appendChild
    ;[
      [btn_container, [this.e.mute_btn, this.e.channel_btn]],
      [
        input_left_container,
        [this.e.input, this.e.volume_range, btn_container],
      ],
      [input_container, [input_left_container, this.e.pan_knob]],
      [container, [input_container]],
      [shadow, [container, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
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

  changePan = value => {
    globalThis.audioClass.panner.pan.value = value / 100
  }

  style = () => `
    .container{
      padding: 10px;
      background: #666666;
      border: solid 1px #777777;
    }
    section{
      margin: 5px;
      width: 200px;
    }
    .input_container{
      display: flex;
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
      color: white;
      background: #424242;
    }
  `
}

customElements.define("horizontal-track", HorizontalTrack)
