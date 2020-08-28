export default class PanKnob extends HTMLElement {
  constructor() {
    super()
    this.downX = null
    this.downY = null
    this.upX = null
    this.upY = null
    this.distance = 0
    this.value = 0
    this.angle = 0
    this.max = 0
    this.min = 0
    this.onchange = null
    this.e = {
      label: document.createElement("p"),
      knob: document.createElement("div"),
      input: document.createElement("input"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      container = document.createElement("div"),
      style = document.createElement("style")
    style.textContent = this.style()
    this.e.input.setAttribute("type", "number")
    //addEventListener
    ;[
      [this.e.input, "change", this.changeInput],
      [this.e.knob, "mousedown", this.mouseDown],
      [document.body, "mousemove", this.mouseMove],
      [document.body, "mouseup", this.mouseUp],
    ].forEach(([e, action, func]) => e.addEventListener(action, func))

    //add class
    ;[
      [this.e.label, "label"],
      [this.e.knob, "knob"],
      [container, "container"],
    ].forEach(([e, name]) => e.classList.add(name))

    // appendChild
    ;[
      [container, [this.e.label, this.e.knob, this.e.input]],
      [shadow, [container, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
  }

  connectedCallback() {
    this.e.label.innerText = this.getAttribute("label")
    // getAttribute
    ;[this.max, this.min, this.value] = ["max", "min", "value"].map(
      key => +this.getAttribute(key) || 0
    )
    ;[
      ["max", this.max],
      ["min", this.min],
      ["value", this.value],
    ].forEach(([key, name]) => this.e.input.setAttribute(key, name))
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
    this.e.input.value = this.value
    this.onchange && this.onchange(this.value)
  }
  rotateKnob(deg) {
    this.e.knob.style.transform = `rotate(${deg}deg)`
  }
  mouseUp = () => {
    this.angle = Number(this.e.knob.style.transform.replace(/[^0-9\-]/g, ""))
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
  disconnectedCallbak() {
    ;[
      [this.e.knob, "mouseup", this.mouseUp],
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
      font-size: 12px;
    }
    .knob{
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
      width: 50px;
      color: white;
      background: transparent;
      font-size: 10px;
    }
  `
}
customElements.define("pan-knob", PanKnob)
