export default class BasicLamp extends HTMLElement {
  static get observedAttributes() {
    return ["active"]
  }
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })
    let light, style
    ;[this.bulb, light, style] = [...Array(2).fill("div"), "style"].map(tag =>
      document.createElement(tag)
    )
    ;[
      [this.bulb, "bulb"],
      [light, "light"],
    ].map(([e, val]) => e.classList.add(val))
    style.textContent = this.style()
    ;[
      [this.bulb, [light]],
      [shadow, [this.bulb, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
  }
  observedAttributes(name) {
    if (name === "active") this.e.bulb.toggleAttribute("active")
    console.log(name)
  }
  connectedCallback() {
    this.hasAttribute("active") && this.e.bulb.setAttribute("active", "")
  }
  style = () => `
  .bulb{
    position: relative;
    height: 10px;
    width: 10px;
    margin: 0 auto;
    border: solid 1px rgba(255,255,255,0.7);
    border-radius: 50%;
  }
  .bulb:after{
    content: "";
    position: absolute;
    height: 2px;
    width:2px;
    top: 1px;
    left: 3px;
    background: rgba(255,255,255,0.7); 
    filter: blur(1px);
  }
  .bulb[active] .light{
    display: inline;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -3px;
    right: 0;
    height:15px;
    width: 15px;
    background: #ff4f4f;
    filter: blur(4px);
  }
  `
}
customElements.define("basic-lamp", BasicLamp)
