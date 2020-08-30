class ToggleSwitch extends HTMLElement {
  static get observedAttributes() {
    return ["active"]
  }
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" }),
      style = document.createElement("style")
    this.addEventListener("click", this.onClick)
    style.textContent = this.style()
    ;[style].forEach(e => shadow.appendChild(e))
  }
  observedAttributes(name) {
    if (name === "active") {
      this.onClick()
    }
  }

  onClick() {
    this.toggleAttribute("active")
  }

  style = () => `
      :host{
        user-select: none;
        position: absolute;
        display: inline-block;
        width: 40px;
        height: 20px;
        border: solid 2px white;
        border-radius: 40px;
        cursor: pointer;
        transition: border var(--theme-change-speed, 0.3s) ease;
      }
      :host:before{
        content: "";
        vertical-align: middle;
        position: relative;
        display: inline-block;
        left: 0;
        width: 18px;
        height: 18px;
        margin: 1px;
        background: white;
        border-radius: 10px; 
        transition: 
          left 0.3s ease,
          background var(--theme-change-speed, 0.3s) ease;
      }
      :host([active]):before{
        left: 20px;
      }
  `
}
customElements.define("toggle-switch", ToggleSwitch)
