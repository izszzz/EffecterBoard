import "./knob/DistortionKnob.js"
export default class DistortionEffector extends HTMLElement {
  constructor() {
    super()
    this._input= null
    this._output = null
    this._gain = null
    this._wave = null
    const shadow = this.attachShadow({ mode: "open" })
    let container, knob_container, img, style
    ;[this.gainKnob, this.waveKnob, container, knob_container, img, style] = [
      ...Array(2).fill("distortion-knob"),
      ...Array(2).fill("div"),
      "img",
      "style",
    ].map(tag => document.createElement(tag))

    //setAttribute
    style.textContent = this.style()
    ;[
      [
        this.gainKnob,
        [
          ["label", "gain"],
          ["min", 0],
          ["max", 300],
          ["value", 100],
        ],
      ],
      [
        this.waveKnob,
        [
          ["label", "dist"],
          ["min", 0],
          ["max", 500],
          ["value", 250],
        ],
      ],
      [
        img,
        [
          ["src", "./img/distortion_logo.png"],
          ["draggable", false],
        ],
      ],
    ].forEach(([e, classes]) =>
      classes.forEach(([key, val]) => e.setAttribute(key, val))
    )
    // addEventListener
    ;[
      [this.gainKnob, this.changeGain],
      [this.waveKnob, this.changeWave],
    ].forEach(([e, func]) => (e.onchange = func))

    // add class
    ;[
      [container, "container"],
      [knob_container, "knob-container"],
    ].forEach(([e, val]) => e.classList.add(val))

    // appendChild
    ;[
      [knob_container, [this.gainKnob, this.waveKnob]],
      [container, [knob_container, img]],
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

  get input() {
    return this._input
  }
  set input(val) {
    this._input = val
  }

  get output() {
    return this._output
  }
  set output(val) {
    this._output = val
  }

  connectedCallback (){
    ;[
      ["slot", "effector"],
      ["active", ""],
    ].forEach(([key, val]) => this.setAttribute(key, val))
    this.createNodes()
    this.connectNodes()
  }

  createNodes() {
    this.wave = globalThis.audioClass.ctx.createWaveShaper()
    this.input = this.gain = globalThis.audioClass.ctx.createGain()
  }

  connectNodes() {
    this.gain.gain.value = this.gainKnob.value / 100
    this.output = this.gain.connect(this.wave)
  }

  disconnectNodes() {
    this.gain.disconnect(this.wave)
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
      //curve[i] =
        //((3 + k) * Math.atan(Math.sinh(x * 0.25) * 5)) /
        //(Math.PI + k * Math.abs(x))
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x))
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
  `
}
customElements.define("distortion-effector", DistortionEffector)
