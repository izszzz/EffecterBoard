export default class DistortionKnob extends HTMLElement {
  constructor() {
    super()
    this.downX
    this.downY
    this.upX
    this.upY
    this.distance = 0
    this.value = 0
    this.max = 100
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

    this.e.knob.addEventListener("mousedown", this.mouseDown)
    document.body.addEventListener("mousemove", this.mouseMove)
    document.body.addEventListener("mouseup", this.mouseUp)

    style.textContent = this.style()
    this.e.label.classList.add("label")
    this.e.knob.classList.add("knob")
    container.classList.add("container")
    this.e.input.setAttribute("type", "number")
    ;[
      [container, [this.e.label, this.e.knob, this.e.input]],
      [shadow, [container, style]],
    ].forEach(([parent, children]) =>
      children.forEach(child => parent.appendChild(child))
    )
  }

  connectedCallback() {
    this.e.label.innerText = this.getAttribute("label")
    ;[
      ["max", this.getAttribute("max")],
      ["min", this.getAttribute("min")],
      ["value", this.getAttribute("value")],
    ].forEach(([key, value]) => this.e.input.setAttribute(key, value))
  }

  rotateKnob(deg) {
    this.e.knob.style.transform = `rotate(${deg}deg)`
    const per = (deg + 130) / 260
    const value = Math.floor(this.getAttribute("max") * per)
    this.e.input.value = value
    this.onchange(value)
  }
  mouseUp = e => {
    const replaced = Number(
      this.e.knob.style.transform.replace(/[^0-9\-]/g, "")
    )
    this.value = replaced
    this.downX = this.downY = null
  }
  mouseDown = e => {
    this.downX = e.pageX
    this.downY = e.pageY
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
      this.distance = this.distance + this.value
      if (this.distance > 130) {
        this.distance = 130
      } else if (this.distance < -130) {
        this.distance = -130
      }
      this.rotateKnob(this.distance)
    }
  }
  disconnectedCallback() {
    this.e.knob.removeEventListener("mouseup", this.mouseUp)
    document.body.removeEventListener("mousemove", this.mouseMove)
    document.body.removeEventListener("mousedown", this.mouseDown)
  }
  style = () => `
    .container{
      width: 50px;
    }
    .label{
      text-align: center;
      margin: 0;
      color: white;
    }
    .knob{
      display: block;
      position: relative;
      background: #3b3b3b;
      height: 40px;
      width: 40px;
      margin: 5px auto;
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
    }
  `
}
customElements.define("distortion-knob", DistortionKnob)
