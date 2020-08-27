export default class BasicLamp extends HTMLElement {
  static get observedAttributes() {
    return ["active"]
  }
  constructor() {
    super()
    this.e = {
      bulb: document.createElement("div"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      light = document.createElement("div"),
      style = document.createElement("style")
    style.textContent = this.style()
    this.e.bulb.classList.add("bulb")
    light.classList.add("light")
    this.e.bulb.appendChild(light)
    shadow.appendChild(this.e.bulb)
    shadow.appendChild(style)
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
