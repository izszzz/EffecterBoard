export default class BasicModal extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" }),
      window = document.createElement("div"),
      header = document.createElement("header"),
      content_slot = document.createElement("slot"),
      title_slot = document.createElement("slot"),
      style = document.createElement("style")
    this.addEventListener("click", this.closeModal)
    style.textContent = this.style()
    content_slot.setAttribute("name", "content")
    title_slot.setAttribute("name", "title")
    window.classList.add("window")
    header.appendChild(title_slot)
    window.appendChild(header)
    window.appendChild(content_slot)
    shadow.appendChild(window)
    shadow.appendChild(style)
  }
  closeModal = e => e.currentTarget.removeAttribute("active", "")
  style = () => `
    :host([active]){
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height:100%;
        width: 100%;
        background: rgba(0,0,0,0.2);
    }
    :host{
        display: none;
    }
    .window{
        display: inline-block;
        background: white;
        border-radius: 5px;
    }
    header{
        border-bottom: solid 1px black;
    }
    ::slotted([slot=content]){
        list-style: none;
        padding: 10px;
    }
  `
}
customElements.define("basic-modal", BasicModal)
