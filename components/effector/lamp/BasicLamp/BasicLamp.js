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
    if (name === "acitve") this.e.bulb.setAttribute("active", "")
  }
  style = () => `

  :host{
    height: 100px;
    width: 100px;
    background: #2b2b2b;
  }

  .bulb{
    position: relative;
    height: 10px;
    width: 10px;
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
  :host([active]){
    hegiht:5px;
    width: 5px;
    background: red;
  }
  `
}
customElements.define("basic-lamp", BasicLamp)
