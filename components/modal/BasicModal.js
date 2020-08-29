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

    window.classList.add("window")
    close_btn.classList.add("close-btn")
    close_btn.innerText = "×"
    style.textContent = this.style()

    // addEventListener
    ;[
      [this, "click", this.closeModal],
      [window, "click", e => e.stopPropagation()],
      [close_btn, "click", this.closeModal],
    ].forEach(([e, action, func]) => e.addEventListener(action, func))

    // setAttribute
    ;[
      [content_slot, "name", "content"],
      [title_slot, "name", "title"],
      [style_slot, "name", "stle"],
    ].forEach(([e, attr, name]) => e.setAttribute(attr, name))

    //appendChild
    ;[
      [header, [title_slot, close_btn]],
      [window, [header, content_slot]],
      [shadow, [window, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
  }

  closeModal = () => {
    this.removeAttribute("active")
    this.textContent = ""
  }

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
      font-size: var(--font-size-big);
      font-weight: 200;
      color: var(--text-main-color)
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
