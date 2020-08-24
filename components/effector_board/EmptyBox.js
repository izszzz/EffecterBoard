export default class EmptyBox extends HTMLElement {
  constructor() {
    super()
    this.effectors = [
      "distortion-effector",
      "overdrive-effector",
      "compressor-effector",
    ]
    this.e = {
      box: document.createElement("div"),
      effector_board: document.querySelector("effector-board"),
      modal: document.querySelector("basic-modal"),
      modal_title: document.createElement("h3"),
      modal_content: document.createElement("ul"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      style = document.createElement("style")
    style.textContent = this.style()
    this.e.box.classList.add("box")
    this.e.box.innerText = "emptybox"
    this.e.box.addEventListener("click", this.openModal)
    shadow.appendChild(this.e.box)
    shadow.appendChild(style)
    this.EmptyBoxModal()
  }

  openModal = () => {
    const modal = this.e.modal
    modal.setAttribute("active", "")
    modal.appendChild(this.e.modal_title)
    modal.appendChild(this.e.modal_content)
  }

  EmptyBoxModal = () => {
    const eb = this.e.effector_board,
      title = this.e.modal_title,
      content = this.e.modal_content
    title.innerText = "Select Effecter"
    title.setAttribute("slot", "title")
    content.setAttribute("slot", "content")
    this.effectors.forEach(effector => {
      const li = document.createElement("li")
      li.innerText = effector
      li.addEventListener("click", () => eb.createEffector(effector))
      content.appendChild(li)
    })
  }

  style = () => `
  .box{
      height: 400px;
      width: 250px;
      margin: 0 5px;
      border: solid 1px black;
      cursor: pointer;
      user-select: none;
  }
  `
}
customElements.define("empty-box", EmptyBox)
