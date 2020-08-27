class ToggleSwitch extends HTMLElement {
  static get observedAttributes() {
    return ["active"]
  }
  constructor() {
    super()
    this.e = {
      btn: document.createElement("div"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      style = document.createElement("style")

    this.addEventListener("click", this.onClick)
    style.textContent = this.style()
    ;[this.e.btn, style].forEach(e => shadow.appendChild(e))
  }
  observedAttributes(name) {
    if (name === "active") {
      this.onClick()
    }
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
        display: inline-block;
        width: 40px;
        border: solid 2px white;
        border-radius: 40px;
        cursor: pointer;
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
        background: white;
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
customElements.define("toggle-switch", ToggleSwitch)
