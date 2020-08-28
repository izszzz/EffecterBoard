import "./knob/DistortionKnob.js"
import "./lamp/BasicLamp.js"
import "./btn/ToggleSwitch.js"
export default class DistortionEffector extends HTMLElement {
  static get observedAttributes() {
    return ["mounted"]
  }
  constructor() {
    super()
    this._output = null
    this._gain = null
    this._wave = null
    this.e = {
      lamp: document.createElement("basic-lamp"),
      gainKnob: document.createElement("distortion-knob"),
      waveKnob: document.createElement("distortion-knob"),
      switch: document.createElement("toggle-switch"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      container = document.createElement("div"),
      knob_container = document.createElement("div"),
      img = document.createElement("img"),
      style = document.createElement("style")

    style.textContent = this.style()
    ;[
      ["label", "gain"],
      ["min", 0],
      ["max", 300],
      ["value", 100],
    ].forEach(([key, value]) => this.e.gainKnob.setAttribute(key, value))
    this.e.gainKnob.onchange = this.changeGain
    ;[
      ["label", "dist"],
      ["min", 0],
      ["max", 500],
      ["value", 250],
    ].forEach(([key, value]) => this.e.waveKnob.setAttribute(key, value))
    this.e.waveKnob.onchange = this.changeWave

    this.e.switch.addEventListener("click", this.power)
    this.e.waveKnob.setAttribute("label", "dist")
    this.e.lamp.setAttribute("active", "")
    container.classList.add("container")
    img.setAttribute("src", "./img/distortion_logo.png")
    img.setAttribute("draggable", false)

    knob_container.classList.add("knob-container")
    ;[
      [knob_container, [this.e.gainKnob, this.e.waveKnob]],
      [container, [this.e.lamp, knob_container, img, this.e.switch]],
      [shadow, [container, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
  }

  get gain() {
    return this._gain
  }
  set gain(val) {
    this._gain = val
  }

  get wave() {
    return this._wave
  }
  set wave(val) {
    this._wave = val
  }

  get output() {
    return this._output
  }
  set output(val) {
    this._output = val
  }

  connectedCallback() {
    this.setAttribute("active", "")
    this.createNodes()
    this.connectNodes()
  }

  power = () => {
    let elements = [this, this.e.lamp, this.e.switch]
    if (this.hasAttribute("active")) {
      elements.forEach(e => e.removeAttribute("active"))
      this.disconnectNodes()
    } else {
      elements.forEach(e => e.setAttribute("active", ""))
      this.connectNodes()
    }
  }

  createNodes() {
    this.wave = globalThis.audioClass.ctx.createWaveShaper()
    this.gain = globalThis.audioClass.ctx.createGain()
  }

  connectNodes() {
    this.gain.gain.value = this.e.gainKnob.value / 100
    this.output = this.wave.connect(this.gain)
  }

  disconnectNodes() {
    this.wave.disconnect(this.gain)
    this.gain.gain.value = 0
    this.output = this.gain
  }

  changeWave = value =>
    this.hasAttribute("active") &&
    (this.wave.curve = this.makeDistortionCurve(value))

  changeGain = value =>
    this.hasAttribute("active") && (this.gain.gain.value = value / 100)

  makeDistortionCurve(amount) {
    var k = typeof amount === "number" ? amount : 400,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x
    for (; i < n_samples; ++i) {
      x = (i * 2) / n_samples - 1
      curve[i] =
        ((3 + k) * Math.atan(Math.sinh(x * 0.25) * 5)) /
        (Math.PI + k * Math.abs(x))
      // curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x))
    }
    return curve
  }

  style = () => `
  .container{
    position: relative;
    height: 400px;
    width: 250px;
    padding: 5px;
    background: #2b2b2b;
    border-radius: 5px;
    user-select: none;
  }
  .knob-container{
    display: flex;
    justify-content: space-around;
    margin: 40px  0;
  }
  input[type=range]{
    appearance: none;
    backgroudn: white;
    height: 2px;
  }
  img{
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
  }
  toggle-switch{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  `
}
customElements.define("distortion-effector", DistortionEffector)
