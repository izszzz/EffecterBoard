export default class BasicModal extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" }),
      window = document.createElement("div"),
      header = document.createElement("header"),
      style = document.createElement("style"),
      close_btn = document.createElement("div"),
      content_slot = document.createElement("slot"),
      title_slot = document.createElement("slot"),
      style_slot = document.createElement("slot")

    this.addEventListener("click", this.closeModal)
    content_slot.setAttribute("name", "content")
    title_slot.setAttribute("name", "title")
    style_slot.setAttribute("name", "title")
    window.classList.add("window")
    window.addEventListener("click", e => e.stopPropagation())
    close_btn.addEventListener("click", this.closeModal)
    close_btn.classList.add("close-btn")
    close_btn.innerText = "×"
    style.textContent = this.style()
    header.appendChild(title_slot)
    header.appendChild(close_btn)
    window.appendChild(header)
    window.appendChild(content_slot)
    shadow.appendChild(window)
    shadow.appendChild(style)
  }
  closeModal = () => this.removeAttribute("active", "")
  style = () => `
    :host([active]){
        display: flex;
    }
    :host{
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        justify-content: center;
        align-items: center;
        height:100%;
        width: 100%;
        background: rgba(0,0,0,0.2);
    }
    .window{
        display: inline-block;
        background: white;
        border-radius: 5px;
    }
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 500px;
        border-bottom: solid 1px black;
    }
    ::slotted([slot="title"]){
      margin: 0 10px;
      font-size: 18px;
      font-weight: 200;
    }
    .close-btn{
      text-align: center;
      vertical-align: middle;
      height: 100%;
      padding: 0 8px;
      font-size: 30px;
      font-weight: 700;
      cursor: pointer;
    }
  `
}
customElements.define("basic-modal", BasicModal)
