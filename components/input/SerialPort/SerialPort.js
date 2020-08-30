import "../../btn/BasicBtn.js"
export default class SerialPort extends HTMLElement {
  constructor() {
    super()
    this.reader = null
    this.decoder = new TextDecoderStream()
    this.e = {
      effectorBoard: document.querySelector("effector-board"),
    }

    const shadow = this.attachShadow({ mode: "open" }),
      btn = document.createElement("basic-btn")
    btn.setAttribute("label", "outsideDevice")
    btn.addEventListener("click", this.onClick)
    shadow.appendChild(btn)
  }

  onClick = () =>
    (async () => {
      const port = await navigator.serial.requestPort()
      await port.open({ baudrate: 9600 })
      const inputDone = port.readable.pipeTo(this.decoder.writable),
        inputStream = this.decoder.readable
      this.reader = inputStream.getReader()
      await this.load()
    })()

  async read() {
    while (true) {
      const { value, done } = await this.reader.read()
      const replaced = value.replace(/\s+/g, "")
      if (replaced) {
        const move_boxes = document
          .querySelector("effector-board")
          .shadowRoot.querySelectorAll("move-box")
        move_boxes[+replaced].power()
      }
    }
  }
  async setup() {
    let text = ""
    while (true) {
      const { value, done } = await this.reader.read()
      if (value) {
        text += value.replace(/\s+/g, "")
        console.log(text)
      }
      if (text === "HelloWorld") {
        console.log("setup complete")
        break
      }
    }
  }
  async load() {
    await this.setup()
    await this.read()
  }
}
customElements.define("serial-port", SerialPort)
