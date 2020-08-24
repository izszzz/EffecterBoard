export default class DistortionEffector extends HTMLElement {
  static get observedAttributes() {
    return ["mounted"]
  }
  constructor() {
    super()
    this._output = null

    const shadow = this.attachShadow({ mode: "open" }),
      container = document.createElement("div"),
      style = document.createElement("style")
    style.textContent = this.style()
    container.classList.add("container")
    shadow.appendChild(container)
    shadow.appendChild(style)
    this.distortion()
  }

  get output() {
    return this._output
  }
  set output(val) {
    this._output = val
  }
  attributeChangedCallback() {
    if (this.hasAttribute("mounted")) {
      this.distortion()
    }
  }

  on() {}
  off() {}

  distortion() {
    this.output = globalThis.audioClass.ctx.createWaveShaper()
    this.distortion.curve = this.makeDistortionCurve(400)
  }
  makeDistortionCurve(amount) {
    var k = typeof amount === "number" ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x
    for (; i < n_samples; ++i) {
      x = (i * 2) / n_samples - 1
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x))
    }
    return curve
  }

  style = () => `
  .container{
      height: 400px;
      width: 250px;
      border: solid 1px red;
      cursor: pointer;
      user-select: none;
  }
  `
}
customElements.define("distortion-effector", DistortionEffector)
