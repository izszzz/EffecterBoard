export default class MoveBox extends HTMLElement {
  constructor() {
    super()
    this.e = {
      effectorBoard: document.querySelector("effector-board"),
    }
    this._effector = null
    const shadow = this.attachShadow({ mode: "open" }),
      container = document.createElement("div"),
      close_btn = document.createElement("span"),
      slot = document.createElement("slot"),
      style = document.createElement("style")

    style.textContent = this.style()
    slot.setAttribute("name", "effector")
    container.classList.add("container")
    close_btn.classList.add("close-btn")
    close_btn.innerText = "×"
    close_btn.addEventListener("click", this.removeThis)
    container.appendChild(close_btn)
    container.appendChild(slot)
    shadow.appendChild(container)
    shadow.appendChild(style)
  }

  get effector() {
    return this._effector
  }
  set effector(val) {
    this._effector = val
  }

  removeThis = () => {
    this.effector.disconnectNodes()
    this.e.effectorBoard.removeEffector(this.effector)
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
