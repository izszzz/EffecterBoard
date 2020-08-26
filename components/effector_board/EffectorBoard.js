import "../effector/DistortionEffector/DistortionEffector.js"
import "./EmptyBox.js"
import "./MoveBox.js"
export default class EffectorBoard extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" }),
      style = document.createElement("style")
    this._effectors = []
    this._output = null
    this.e = {
      container: document.createElement("div"),
      emptybox: document.createElement("empty-box"),
    }
    style.textContent = this.style()
    this.setAttribute("effectors", "")
    this.e.container.classList.add("container")

    this.e.container.appendChild(this.e.emptybox)
    shadow.appendChild(this.e.container)
    shadow.appendChild(style)
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

  get effectors() {
    return this._effectors
  }

  set effectors(val) {
    this._effectors = val
  }

  createEffector(effector) {
    this.input = globalThis.audioClass.masterGain
    const mb = document.createElement("move-box"),
      ef = document.createElement(effector)
    ef.setAttribute("slot", "effector")
    ef.setAttribute("mounted", "")
    mb.appendChild(ef)
    mb.effector = ef
    this.disconnectEffectors()
    this.effectors = [...this.effectors, ef]
    this.e.container.insertBefore(mb, this.e.emptybox)
    this.connectEffectors()
    globalThis.audioClass.output()
  }

  removeEffector(setedEffecter) {
    this.disconnectEffectors()
    this.effectors = this.effectors.filter(
      effector => effector !== setedEffecter
    )
    this.connectEffectors()
    globalThis.audioClass.output()
  }

  connectEffectors() {
    globalThis.audioClass.effectorBoardOutput = [
      this.input,
      ...this.effectors.map(effector => effector.output),
    ].reduce((a, b) => a && a.connect(b))
  }

  disconnectEffectors() {
    ;[this.input, ...this.effectors.map(effector => effector.output)].reduce(
      (a, b) => a && a.disconnect(b)
    )
  }

  style = () => `
  .container{
    display: flex;
    align-items: center;
    margin: 10px;
    padding: 10px;
  }
  `
}

customElements.define("effector-board", EffectorBoard)
