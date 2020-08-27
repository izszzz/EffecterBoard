export default class VolumeRange extends HTMLElement {
  static get observedAttributes() {
    return ["value"]
  }
  constructor() {
    super()
    this._value = null
    this.onchange = null
    this.e = {
      container: document.createElement("div"),
      range: document.createElement("input"),
      input: document.createElement("input"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      style = document.createElement("style")
    style.textContent = this._style()
    this.e.container.classList.add("container")
    this.e.range.setAttribute("type", "range")
    this.e.range.addEventListener("input", this._changeRangeValue)
    this.e.input.setAttribute("type", "number")
    this.e.input.addEventListener("input", this._changeInputValue)
    this.e.container.appendChild(this.e.input)
    this.e.container.appendChild(this.e.range)
    shadow.appendChild(this.e.container)
    shadow.appendChild(style)
  }

  attributeChangedCallback(name) {
    if (name === "value") this.onchange && this.onchange(this.value)
  }
  connectedCallback() {
    this.e.input.setAttribute("max", this.getAttribute("max") || 150)
    this.e.range.setAttribute("max", this.getAttribute("max") || 150)
    this.e.input.setAttribute("min", this.getAttribute("min") || 0)
    this.e.range.setAttribute("min", this.getAttribute("min") || 0)
    this.e.input.setAttribute("value", this.getAttribute("value") || 100)
    this.e.range.setAttribute("value", this.getAttribute("value") || 100)
    this.value = this.getAttribute("value") || 100
  }

  get value() {
    return this._value
  }
  set value(val) {
    this._value = val
  }

  _changeInputValue = e => {
    const value = e.currentTarget.value
    this.e.range.value = value
    this.value = value
    this.setAttribute("value", value)
  }
  _changeRangeValue = e => {
    const value = e.currentTarget.value
    this.e.input.value = value
    this.value = value
    this.setAttribute("value", value)
  }

  _style = () => `
  :host{
    display: block;
  }
  input[type=number]{
    vertical-align: middle;
    width: 50px;
    margin: 0;
    color: white;
    background: #424242;
  }
  input[type=range]{
    vertical-align: middle;
    -webkit-appearance: none;
    appearance: none;
    height: 2px;
    width: 150px;
    margin: 0;
    background: #424242;
  }
  input[type=range]::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    width: 10px;
    height: 5px;
    background: #e3e3e3;
  }
  input[type=range]:active,input[type=range]:focus{
    outline: none;
  }
  `
}

customElements.define("volume-range", VolumeRange)
