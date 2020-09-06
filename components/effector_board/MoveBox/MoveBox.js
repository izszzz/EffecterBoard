import "./lamp/BasicLamp.js"
import "./btn/ToggleSwitch.js"
export default class MoveBox extends HTMLElement {
  constructor() {
    super()
    this._effector = null
    this.effectorBoard = document.querySelector("effector-board")
    const shadow = this.attachShadow({ mode: "open" })
    let container, slot, style
    ;[this.close_btn, this.lamp, this.toggle_switch, container, slot, style] = [
      "span",
      "basic-lamp",
      "toggle-switch",
      "div",
      "slot",
      "style",
    ].map(tag => document.createElement(tag))

    style.textContent = this.style()
    this.close_btn.innerText = "×"
    // add class
    ;[
      [container, "container"],
      [this.close_btn, "close-btn"],
    ].forEach(([e, name]) => e.classList.add(name))
    // setAttribute
    ;[
      [slot, "name", "effector"],
      [this.lamp, "active", ""],
      [this.toggle_switch, "active", ""],
    ].forEach(([e, key, value]) => e.setAttribute(key, value))
    // addEventListener
    ;[
      [this.close_btn, "click", this.delete],
      [this.toggle_switch, "click", this.power],
    ].forEach(([e, action, func]) => e.addEventListener(action, func))
    // appendChild
    ;[
      [container, [this.close_btn, this.lamp, this.toggle_switch, slot]],
      [shadow, [container, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
  }

  get effector() {
    return this._effector
  }
  set effector(val) {
    this._effector = val
  }
  connectedCallback() {
    this.setAttribute("active", "")
  }

  disconnectedCallbak() {
    this.close_btn.removeEventListener("click", this.delete)
  }

  power = () => {
    let elements = [this, this.lamp, this.toggle_switch]
    if (this.hasAttribute("active")) {
      elements.forEach(e => e.removeAttribute("active"))
      this.effector.disconnectNodes()
    } else {
      elements.forEach(e => e.setAttribute("active", ""))
      this.effector.connectNodes()
    }
  }

  delete = e => {
    this.effector.disconnectNodes()
    this.effectorBoard.removeEffector(this.effector)
    e.stopPropagation()
    this.remove()
  }

  style = () => `
  .container{
    position: relative;
    margin: 0 5px;
    user-select: none;
    border-radius: 5px;
  }
  .close-btn{
    display: inline-block;
    position: absolute;
    z-index: 1;
    right: 0;
    height: 20px;
    width: 20px;
    margin: 5px;
    background: white;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    opacity: 0.5;
    cursor: pointer;
  }
  .close-btn:hover{
    opacity: 0.8;
  }
  toggle-switch{
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  basic-lamp{
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 20px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  `
}
customElements.define("move-box", MoveBox)
