export default class VolumeRange extends HTMLElement {
  static get observedAttributes() {
    return ["value"]
  }
  constructor() {
    super()
    this._value = null
    this.onchange = null
    const shadow = this.attachShadow({ mode: "open" })
    let style
    ;[this.container, this.range, this.input, style] = [
      "div",
      ...Array(2).fill("input"),
      "style",
    ].map(tag => document.createElement(tag))
    style.textContent = this._style()
    ;[
      [this.range, "range", this._changeRangeValue],
      [this.input, "number", this._changeInputValue],
    ].forEach(([e, val, func]) => {
      e.setAttribute("type", val)
      e.addEventListener("input", func)
    })
    this.container.classList.add("container")
    ;[this.input, this.range].forEach(e => this.container.appendChild(e))
    ;[this.container, style].forEach(e => shadow.appendChild(e))
  }

  attributeChangedCallback(name) {
    if (name === "value") this.onchange && this.onchange(+this.value)
  }

  connectedCallback() {
    const [max = 150, min = 0, value = 100] = ["max", "min", "value"].map(key =>
      this.getAttribute(key)
    )
    ;[this.input, this.range].forEach(e =>
      [
        ["max", max],
        ["min", min],
        ["value", value],
      ].forEach(([key, value]) => e.setAttribute(key, value))
    )
    this.value = value
  }

  get value() {
    return this._value
  }
  set value(val) {
    this._value = val
  }

  _changeInputValue = e => {
    const value = e.currentTarget.value
    this.range.value = value
    this.value = value
    this.setAttribute("value", value)
  }
  _changeRangeValue = e => {
    const value = e.currentTarget.value
    this.input.value = value
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
    color: var(--text-invert-color);
    background: var(--input-bg-color);
    font-size: var(--font-size-normal);
  }

  input[type=range]{
    -webkit-appearance: none;
    appearance: none;
    vertical-align: middle;
    height: 2px;
    width: 150px;
    margin: 0;
    background: var(--input-bg-color);
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
