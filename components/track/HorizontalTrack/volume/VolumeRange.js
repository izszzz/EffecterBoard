export default class VolumeRange extends HTMLElement {
  static get observedAttributes() {
    return ["value"]
  }
  constructor() {
    super()
    this._value = this.onchange = null
    const shadow = this.attachShadow({ mode: "open" })
    let style
    ;[this.container, this.range, this.input, style] = [
      "div",
      ...Array(2).fill("input"),
      "style",
    ].map(tag => document.createElement(tag))
    ;[
      [this.range, "range", this._changeRangeValue],
      [this.input, "number", this._changeInputValue],
    ].forEach(([e, val, func]) => {
      e.setAttribute("type", val)
      e.addEventListener("input", func)
    })
    this.container.classList.add("container")
    ;[
      [this.container, [this.input, this.range]],
      [shadow, [this.container, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
    style.textContent = this.style()
  }

  attributeChangedCallback(name) {
    if (name === "value") this.onchange && this.onchange(+this.value)
  }

  connectedCallback() {
    const [max = 150, min = 0, value = 100] = ["max", "min", "value"].map(
      key => this.getAttribute(key) || undefined
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
    this.range.value = this._changeValue(e)
  }
  _changeRangeValue = e => {
    this.input.value = this._changeValue(e)
  }
  _changeValue = e => {
    const value = e.currentTarget.value
    this.value = value
    this.setAttribute("value", value)
    return value
  }

  style = () => `
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
