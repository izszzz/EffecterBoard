export default class EmptyBox extends HTMLElement {
  constructor() {
    super()
    this.effectors = [
      "distortion-effector",
      "delay-effector",
      "compressor-effector",
    ]
    this.e = {
      box: document.createElement("div"),
      effector_board: document.querySelector("effector-board"),
      modal: document.querySelector("basic-modal"),
      modal_title: document.createElement("p"),
      modal_content: document.createElement("ul"),
      modal_style: document.createElement("style"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      style = document.createElement("style")

    this.e.modal_style.textContent = this.modal_style()
    this.e.modal_style.setAttribute("slot", "style")

    style.textContent = this.style()

    this.e.box.classList.add("box")
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
    modal.appendChild(this.e.modal_style)
  }

  EmptyBoxModal = () => {
    const eb = this.e.effector_board,
      title = this.e.modal_title,
      content = this.e.modal_content
    title.innerText = "Select Effector"
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
    position: relative;
    height: 400px;
    width: 250px;
    margin: 0 5px;
    border: dashed 5px #808080;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    transition: border 0.2s ease;
  }
  .box:after{
    content:"";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    width: 20px;
    margin: auto;
    background: #808080;
    border-radius: 5px;
    transition: background 0.2s ease;
  }
  .box:before{
    content:"";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 20px;
    width: 100px;
    margin: auto;
    background: #808080;
    border-radius: 5px;
    transition: background 0.2s ease;
  }
  .box:hover{
    border: dashed 5px #d1d1d1;
  }
  .box:hover.box:after,.box:hover.box:before{
    background: #d1d1d1;
  }
  `
  modal_style = () => `
  ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li{
    padding: 5px 10px;
    border-bottom: solid 1px black;
    cursor: pointer;
  }
  li:last-child{
    border-bottom: 0;
  }
  `
}
customElements.define("empty-box", EmptyBox)
