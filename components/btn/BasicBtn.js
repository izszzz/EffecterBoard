export default class BasicBtn extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })
    this.e = {
      style: document.createElement("style"),
      div: document.createElement("div"),
    }
    this.e.style.textContent = this.style()
    ;[this.e.div, this.e.style].forEach(e => shadow.appendChild(e))
  }
  onClick() {
    location.href = this.getAttribute("path")
  }
  connectedCallback() {
    const [normal, hover, active] = ["normal", "hover", "active"].map(attr =>
      this.getAttribute(attr)
    )
    this.e.style.textContent += `
    div{
      background: ${normal};
    }
    div:hover{
      background: ${hover};
    }
    div:active{
      background: ${active};
    }
    div:before{
      content: "${this.getAttribute("label") || ""}"
    }
    `

    this.hasAttribute("path") && this.addEventListener("click", this.onClick)
  }

  style = () => `
    div{
      user-select: none;
      display: inline-block;
      text-align: center;
      padding: 9px 13px;
      color: white;
      border-radius: 5px;
      font-size: var(--normal-font-size, 12px);
      cursor: pointer;
    }
    div{
      background: gray;
    }
    div:hover{
      background: dimgray;
    }
    div:active{
      background: darkgray;
    }
  `
}
customElements.define("basic-btn", BasicBtn)
