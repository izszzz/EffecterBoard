export default class EmptyBox extends HTMLElement {
  constructor() {
    super()
    this.effectors = [
      "distortion-effector",
      "delay-effector",
      "compressor-effector",
    ]
    const shadow = this.attachShadow({ mode: "open" })
    let style
    ;[this.modal, this.effector_board] = [
      "basic-modal",
      "effector-board",
    ].map(tag => document.querySelector(tag))
    ;[
      this.box,
      this.modal_title,
      this.modal_content,
      this.modal_style,
      style,
    ] = ["div", "p", "ul", ...Array(2).fill("style")].map(tag =>
      document.createElement(tag)
    )

    this.modal_style.textContent = this.modalAddStyle()
    this.modal_style.setAttribute("slot", "style")

    style.textContent = this.style()

    this.box.classList.add("box")
    this.box.addEventListener("click", this.openModal)
    ;[this.box, style].forEach(e => shadow.appendChild(e))
    this.EmptyBoxModal()
  }

  openModal = () => {
    this.modal.setAttribute("active", "")
    ;[this.modal_title, this.modal_content, this.modal_style].forEach(e =>
      this.modal.appendChild(e)
    )
  }

  EmptyBoxModal = () => {
    const [eb, title, content] = [
      this.effector_board,
      this.modal_title,
      this.modal_content,
    ]
    title.innerText = "Select Effector"
    ;[
      [title, "title"],
      [content, "content"],
    ].forEach(([e, val]) => e.setAttribute("slot", val))
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
  modalAddStyle = () => `
  ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li{
    cursor: pointer;
    padding: 5px 10px;
    color: var(--text-main-color);
    border-bottom: solid 1px black;
    font-size: var(--font-size-normal);
  }
  li:last-child{
    border-bottom: 0;
  }
  `
}
customElements.define("empty-box", EmptyBox)
