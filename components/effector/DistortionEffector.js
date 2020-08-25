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
      gainInput: document.createElement("input"),
      gainRange: document.createElement("input"),
      waveInput: document.createElement("input"),
      waveRange: document.createElement("input"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      container = document.createElement("div"),
      style = document.createElement("style")
    style.textContent = this.style()

    this.e.waveRange.addEventListener("input", this.changeDistortion)
    this.e.waveRange.setAttribute("type", "range")
    this.e.waveRange.setAttribute("min", 0)
    this.e.waveRange.setAttribute("max", 500)
    this.e.waveRange.setAttribute("value", 200)

    this.e.waveInput.addEventListener("onchange", this.changeDistortion)
    this.e.waveInput.setAttribute("type", "number")
    this.e.waveInput.setAttribute("min", 0)
    this.e.waveInput.setAttribute("max", 500)
    this.e.waveInput.setAttribute("value", 200)

    this.e.gainRange.addEventListener("input", this.changeGain)
    this.e.gainRange.setAttribute("type", "range")
    this.e.gainRange.setAttribute("min", 0)
    this.e.gainRange.setAttribute("max", 300)
    this.e.gainRange.setAttribute("value", 100)

    this.e.gainInput.addEventListener("onchange", this.changeGain)
    this.e.gainInput.setAttribute("min", 0)
    this.e.gainInput.setAttribute("max", 300)
    this.e.gainInput.setAttribute("value", 100)
    this.e.gainInput.setAttribute("type", "number")

    container.classList.add("container")
    container.appendChild(this.e.waveInput)
    container.appendChild(this.e.waveRange)
    container.appendChild(this.e.gainInput)
    container.appendChild(this.e.gainRange)
    shadow.appendChild(container)
    shadow.appendChild(style)
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

  attributeChangedCallback(name) {
    if (name === "mounted") {
      this.createNodes()
      this.connectNodes()
    }
  }

  createNodes() {
    this.wave = globalThis.audioClass.ctx.createWaveShaper()
    this.gain = globalThis.audioClass.ctx.createGain()
  }

  connectNodes() {
    this.output = this.wave.connect(this.gain)
  }
  disconnectNodes() {
    this.output = this.wave.disconnect(this.gain)
  }

  changeDistortion = e => {
    const value = +e.currentTarget.value
    console.log(typeof value)
    this.wave.curve = this.makeDistortionCurve(value)
    this.e.waveInput.value = value
    this.e.waveRange.value = value
  }

  changeGain = e => {
    const value = +e.currentTarget.value
    this.gain.gain.value = value / 100
    this.e.gainInput.value = value
    this.e.gainRange.value = value
  }

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
      height: 400px;
      width: 250px;
      background: #2b2b2b;
      cursor: pointer;
      user-select: none;
  }
  input[type=range]{
    appearance: none;
  }
  `
}
customElements.define("distortion-effector", DistortionEffector)
