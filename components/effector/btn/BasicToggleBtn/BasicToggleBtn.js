export default class BasicToggleBtn extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" }),
      style = document.createElement("style")

    this.e = {
      btn: document.createElement("div"),
    }

    this.addEventListener("click", this.onClick)
    style.textContent = this.style()

    shadow.appendChild(this.e.btn)
    shadow.appendChild(style)
  }

  onClick() {
    this.e.btn.toggleAttribute("active")
    this.toggleAttribute("active")
  }

  style = () => `
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    :host{
      user-select: none;
      --main-color: black;
      display: inline-block;
      width: 40px;
      border: solid 1px var(--main-border-color, #2b2b2b);
      border-radius: 40px;
      transition: border var(--theme-change-speed, 0.3s) ease;
    }
    div{
      position: relative;
      display: inline-block;
      left:0;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      margin: 1px;
      background: var(--main-border-color, #2b2b2b);
      border-radius: 10px; 
      transition: 
        left 0.3s ease,
        background var(--theme-change-speed, 0.3s) ease;
    }
    div[active]{
      left: 20px;
    }
  `
}

customElements.define("basic-toggle-btn", BasicToggleBtn)
