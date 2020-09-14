export default class DistortionKnob extends HTMLElement {
  constructor() {
    super()
    this.downX = this.downY = this.upX = this.upY = this.onchange = null
    this.distance = this.value = this.angle = this.max = this.min = 0
    const shadow = this.attachShadow({ mode: "open" })
    let container,
      style
      // createElement
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

    //appendChild
    ;[
      [container, [this.label, this.knob, this.input]],
      [shadow, [container, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
  }
  connectedCallback() {
    this.label.innerText = this.getAttribute("label")
    ;[this.max, this.min, this.value, this.label.innerText] = [
      "max",
      "min",
      "value",
      "label",
    ].map(key => this.getAttribute(key) || 0)
    ;[
      ["max", this.max],
      ["min", this.min],
      ["value", this.value],
    ].forEach(([key, name]) => this.input.setAttribute(key, name))
    this.angle = ~~((this.value / this.max) * 260 - 130)
    this.rotateKnob(this.angle)
    this.onchange && this.onchange(this.value)
  }
  changeInput = e => {
    this.value = e.currentTarget.value
    this.angle = ~~((this.value / this.max) * 260 - 130)
    this.onchange && this.onchange(this.value)
  }
  changeKnob(deg) {
    this.rotateKnob(deg)
    this.input.value = this.value = ~~(this.max * ((deg + 130) / 260))
    this.onchange && this.onchange(this.value)
  }

  rotateKnob(deg) {
    this.knob.style.transform = `rotate(${deg}deg)`
  }
  mouseUp = () => {
    this.angle = +this.knob.style.transform.replace(/[^0-9\-]/g, "")
    this.downX = this.downY = null
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
      this.distance = ~~Math.sqrt(
        (this.moveX - this.downX) ** 2 + (this.moveY - this.downY) ** 2
      )
      this.downX > this.moveX && (this.distance = -this.distance)
      this.distance += this.angle

      this.distance > 130 && (this.distance = 130)
      this.distance < -130 && (this.distance = -130)
      this.changeKnob(this.distance)
    }
  }
  disconnectedCallback() {
    ;[
      [this.knob, "up", this.mouseUp],
      [document.body, "move", this.mouseMove],
      [document.body, "down", this.mouseDown],
    ].forEach(([e, act, func]) => e.removeEventListener("mouse" + act, func))
  }
  style = () => `
    .container{
      width: 50px;
    }
    .label{
      text-align: center;
      margin: 0;
      color: white;
      font-size: var(--font-size-normal);
    }
    .knob{
      display: block;
      position: relative;
      background: #3b3b3b;
      height: 40px;
      width: 40px;
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
      width: 50px;
      color: white;
      background: transparent;
      font-size: var(--font-size-normal);
    }
  `
}
customElements.define("distortion-knob", DistortionKnob)
