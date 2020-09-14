class BasicModal extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" }),
      [
        title_slot,
        content_slot,
        style_slot,
        window,
        close_btn,
        header,
        style,
      ] = [
        ...Array(3).fill("slot"),
        ...Array(2).fill("div"),
        "header",
        "style",
      ].map(tag => document.createElement(tag))
    // add class
    ;[
      [window, "window"],
      [close_btn, "close-btn"],
    ].forEach(([e, val]) => e.classList.add(val))
    // addEventListener
    ;[
      [this, this.closeModal],
      [window, e => e.stopPropagation()],
      [close_btn, this.closeModal],
    ].forEach(([e, func]) => e.addEventListener("click", func))
    // setAttribute
    ;[
      [content_slot, "content"],
      [title_slot, "title"],
      [style_slot, "style"],
    ].forEach(([e, name]) => e.setAttribute("name", name))
    //appendChild
    ;[
      [header, [title_slot, close_btn]],
      [window, [header, content_slot]],
      [shadow, [window, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
    close_btn.innerText = "×"
    style.textContent = this.addStyle()
  }

  closeModal = () => {
    this.removeAttribute("active")
  }

  addStyle = () => `
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
      border-radius: var(--main-border-radius, 5px);
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
      font-size: var(--big-font-size, 13px);
      font-weight: 200;
      color: var(--main-font-color, #2b2b2b);
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
