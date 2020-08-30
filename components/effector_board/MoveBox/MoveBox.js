import "./lamp/BasicLamp.js"
import "./btn/ToggleSwitch.js"
export default class MoveBox extends HTMLElement {
  constructor() {
    super()
    this._effector = null
    this.e = {
      effectorBoard: document.querySelector("effector-board"),
      close_btn: document.createElement("span"),
      lamp: document.createElement("basic-lamp"),
      toggle_switch: document.createElement("toggle-switch"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      container = document.createElement("div"),
      slot = document.createElement("slot"),
      style = document.createElement("style")

    style.textContent = this.style()
    this.e.close_btn.innerText = "×"
    // add class
    ;[
      [container, "container"],
      [this.e.close_btn, "close-btn"],
    ].forEach(([e, name]) => e.classList.add(name))
    // setAttribute
    ;[
      [slot, "name", "effector"],
      [this.e.lamp, "active", ""],
      [this.e.toggle_switch, "active", ""],
    ].forEach(([e, key, value]) => e.setAttribute(key, value))
    // addEventListener
    ;[
      [this.e.close_btn, "click", this.delete],
      [this.e.toggle_switch, "click", this.power],
    ].forEach(([e, action, func]) => e.addEventListener(action, func))
    // appendChild
    ;[
      [container, [this.e.close_btn, this.e.lamp, this.e.toggle_switch, slot]],
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
    this.e.close_btn.removeEventListener("click", this.delete)
  }

  power = () => {
    let elements = [this, this.e.lamp, this.e.toggle_switch]
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
    this.e.effectorBoard.removeEffector(this.effector)
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
