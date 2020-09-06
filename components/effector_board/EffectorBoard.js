import "../effector/DistortionEffector/DistortionEffector.js"
import "./EmptyBox.js"
import "./MoveBox/MoveBox.js"
export default class EffectorBoard extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })
    let style
    this.input = globalThis.audioClass.masterGain
    this._output = null
    this._effectors = []
    // createElement
    ;[this.container, this.emptybox, style] = [
      "div",
      "empty-box",
      "style",
    ].map(tag => document.createElement(tag))
    style.textContent = this.style()
    this.container.classList.add("container")
    //appendChild
    ;[
      [this.container, [this.emptybox]],
      [shadow, [this.container, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
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
    const [mb, ef] = ["move-box", effector].map(tag =>
      document.createElement(tag)
    )
    mb.appendChild(ef)
    mb.effector = ef
    ef.load()
    this.disconnectEffectors()
    this.effectors = [...this.effectors, ef]
    this.container.insertBefore(mb, this.emptybox)
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
    ].reduce((a, b) => a.connect(b))
  }

  disconnectEffectors() {
    ;[
      this.input,
      ...this.effectors.map(effector => effector.output),
    ].reduce((a, b) => a.disconnect(b))
  }

  style = () => `
  .container{
    display: flex;
    align-items: center;
    padding: 10px;
    overflow-x: scroll;
  }
  `
}

customElements.define("effector-board", EffectorBoard)
