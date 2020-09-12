import "../effector/DistortionEffector/DistortionEffector.js"
import "./EmptyBox.js"
import "./MoveBox/MoveBox.js"
export default class EffectorBoard extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })
    let style
    this._input = globalThis.audioClass.masterGain
    this._output = null
    this._effectors = []
    // createElement
    ;[this.container, this.emptybox, style] = [
      "div",
      "empty-box",
      "style",
    ].map(tag => document.createElement(tag))
    //appendChild
    ;[
      [this.container, [this.emptybox]],
      [shadow, [this.container, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
    style.textContent = this.style()
    this.container.classList.add("container")
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
    this.disconnectEffectors()
    this.effectors = [...this.effectors, ef]
    this.container.insertBefore(mb, this.emptybox)
    this.connectEffectors()
    globalThis.audioClass.output()
  }

  removeEffector(settedEffecter) {
    this.disconnectEffectors()
    this.effectors = this.effectors.filter(
      effector => effector !== settedEffecter
    )
    this.connectEffectors()
    globalThis.audioClass.output()
  }

  connectEffectors() {
    if(this.effectors.length > 0 ) {
      this.input.connect(this.effectors[0].input)
      if(this.effectors.length === 1) {
        globalThis.audioClass.effectorBoardOutput = this.effectors[0].output
      } else {
        for(let i=0; i<this.effectors.length-1; i++){
          this.effectors[i].output.connect(this.effectors[i+1].input)
        }
        globalThis.audioClass.effectorBoardOutput = this.effectors[this.effectors.length-1].output
      }
    }
  }

  disconnectEffectors() {
    if(this.effectors.length > 0 ) {
      this.input.disconnect(this.effectors[0].input)
      if(this.effectors.length === 1) {
        globalThis.audioClass.effectorBoardOutput = this.effectors[0].output
      } else {
        for(let i=0; i<this.effectors.length-1; i++){
          this.effectors[i].output.disconnect(this.effectors[i+1].input)
        }
        globalThis.audioClass.effectorBoardOutput = null 
      }
    }
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
