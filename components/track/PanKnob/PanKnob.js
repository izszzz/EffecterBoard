export default class PanKnob extends HTMLElement {
  constructor() {
    super()
    this.downX = this.downY = this.upX = this.upY = null
    this.distance = this.value = this.angle = this.max = this.min = 0
    this.onchange = null
    const shadow = this.attachShadow({ mode: "open" })
    let container, style
    ;[this.label, this.input, this.knob, container, style] = [
      "p",
      "input",
      ...Array(2).fill("div"),
      "style",
    ].map(tag => document.createElement(tag))
    style.textContent = this.style()
    this.input.setAttribute("type", "number")
    //addEventListener
    ;[
      [this.input, "change", this.changeInput],
      [this.knob, "mousedown", this.mouseDown],
      [document.body, "mousemove", this.mouseMove],
      [document.body, "mouseup", this.mouseUp],
    ].forEach(([e, action, func]) => e.addEventListener(action, func))

    //add class
    ;[
      [this.label, "label"],
      [this.knob, "knob"],
      [container, "container"],
    ].forEach(([e, name]) => e.classList.add(name))

    // appendChild
    ;[
      [container, [this.label, this.knob, this.input]],
      [shadow, [container, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
  }

  connectedCallback() {
    this.label.innerText = this.getAttribute("label")
    // getAttribute
    ;[this.max, this.min, this.value] = ["max", "min", "value"].map(
      key => +this.getAttribute(key) || 0
    )
    ;[
      ["max", this.max],
      ["min", this.min],
      ["value", this.value],
    ].forEach(([key, name]) => this.input.setAttribute(key, name))
    this.angle = Math.floor((this.value / (this.max - this.min)) * (260 - 130))
    this.rotateKnob(this.angle)
  }
  changeInput = e => {
    this.value = e.currentTarget.value
    this.angle = Math.floor((this.value / this.max) * (260 - 130))
    this.rotateKnob(this.angle)
    this.onchange && this.onchange(this.value)
  }
  changeKnob(deg) {
    this.rotateKnob(deg)
    this.value = Math.floor((this.max - this.min) * ((deg + 130) / 260)) - 100
    this.input.value = this.value
    this.onchange && this.onchange(this.value)
  }
  rotateKnob(deg) {
    this.knob.style.transform = `rotate(${deg}deg)`
  }
  mouseUp = () => {
    this.angle = Number(this.knob.style.transform.replace(/[^0-9\-]/g, ""))
    this.downX = null
    this.downY = null
  }
  mouseDown = e => {
    this.downX = e.pageX
    this.downY = e.pageY
    e.stopPropagation()
  }
  mouseMove = e => {
    if (this.downX && this.downY) {
      this.moveX = e.pageX
      this.moveY = e.pageY
      this.distance = Math.floor(
        Math.sqrt(
          Math.pow(this.moveX - this.downX, 2) +
            Math.pow(this.moveY - this.downY, 2)
        )
      )
      this.downX > this.moveX && (this.distance = -this.distance)
      this.distance = this.distance + this.angle
      if (this.distance > 130) {
        this.distance = 130
      } else if (this.distance < -130) {
        this.distance = -130
      }
      this.changeKnob(this.distance)
    }
  }
  disconnectedCallback() {
    ;[
      [this.knob, "mouseup", this.mouseUp],
      [document.body, "mousemove", this.mouseMove],
      [docuement.body, "mousedown", this.mouseDown],
    ].forEach(([e, action, func]) => e.removeEventListener(action, func))
  }
  style = () => `
    .container{
      width: 50px;
    }
    .label{
      text-align: center;
      margin: 0;
      color: white;
      font-size: var(--font-size-small);
    }
    .knob{
      user-select: none;
      display: block;
      position: relative;
      background: #3b3b3b;
      height: 20px;
      width: 20px;
      margin: 5px auto;
      border: solid 2px #424242;
      border-radius: 50%;
    }
    .knob:after{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 10px;
      width: 2px;
      background: white;
    }
    input[type=number]{
      -webkit-appearance: none;
      width: 50px;
      margin: 0;
      color: var(--text-invert-color);
      background: var(--input-bg-color);
      font-size: var(--font-size-small);
    }
  `
}
customElements.define("pan-knob", PanKnob)
