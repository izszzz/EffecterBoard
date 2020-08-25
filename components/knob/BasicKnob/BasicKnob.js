export default class BasicKnob extends HTMLElement {
  constructor() {
    super()
    this.downX
    this.downY
    this.upX
    this.upY
    this.value = 0
    this.distance = 0
    this.e = {
      knob: document.createElement("div"),
      input: document.createElement("input"),
    }
    const shadow = this.attachShadow({ mode: "open" }),
      style = document.createElement("style")

    this.e.knob.addEventListener("mousedown", e => {
      this.downX = e.pageX
      this.downY = e.pageY
    })

    document.body.addEventListener("mousemove", e => {
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
        if (this.distance > 100) {
          this.distance = 100
        } else if (this.distance < -100) {
          this.distance = -100
        }
        this.rotateKnob(this.distance)
      }
    })
    document.body.addEventListener("mouseup", () => {
      const replaced = Number(
        this.e.knob.style.transform.replace(/[^0-9\-]/g, "")
      )
      this.value = replaced
      this.downX = null
      this.downY = null
    })

    style.textContent = this.style()
    this.e.input.setAttribute("type", "number")
    shadow.appendChild(this.e.knob)
    shadow.appendChild(style)
  }

  rotateKnob(deg) {
    this.e.knob.style.transform = `rotate(${deg}deg)`
  }

  connectedCallback() {}

  style = () => `
    div{
      position: relative;
      background: red;
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
    div:after{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 10px auto;
      height: 5px;
      width: 5px;
      border-radius: 50%;
      background: blue;
    }
  `
}
customElements.define("basic-knob", BasicKnob)
