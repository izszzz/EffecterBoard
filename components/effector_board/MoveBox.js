export default class MoveBox extends HTMLElement {
  constructor() {
    super()
    this.e = {
      effectorBoard: document.querySelector("effector-board"),
      close_btn: document.createElement("span"),
    }
    this._effector = null
    const shadow = this.attachShadow({ mode: "open" }),
      container = document.createElement("div"),
      slot = document.createElement("slot"),
      style = document.createElement("style")

    style.textContent = this.style()
    slot.setAttribute("name", "effector")
    container.classList.add("container")
    this.e.close_btn.classList.add("close-btn")
    this.e.close_btn.innerText = "×"
    this.e.close_btn.addEventListener("click", this.delete)
    ;[
      [container, [this.e.close_btn, slot]],
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

  disconnectedCallbak() {
    this.e.close_btn.removeEventListener("click", this.delete)
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
  `
}
customElements.define("move-box", MoveBox)
