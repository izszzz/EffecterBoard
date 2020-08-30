export default class VolumeMeter extends HTMLElement {
  constructor() {
    super()
    this.e = {
      canvas: document.createElement("canvas"),
    }
    this.e.canvas.width = 20
    this.e.canvas.height = 100
    this.ctx = this.e.canvas.getContext("2d")
    const shadow = this.attachShadow({ mode: "open" })
    shadow.appendChild(this.e.canvas)
  }
  connectedCallback() {
    this.ctx.fillRect(
      0,
      this.e.canvas.height,
      this.e.canvas.width,
      this.e.canvas.height
    )
    console.log(this.e.canvas.height)
    const analyser = globalThis.audioClass.analyser,
      bufferLength = analyser.frequencyBinCount,
      dataArray = new Uint8Array(bufferLength)
    setInterval(() => this.draw(analyser, dataArray, bufferLength), 200)
  }
  draw(analyser, dataArray, bufferLength) {
    analyser.getByteFrequencyData(dataArray)
    const sum = dataArray.reduce((a, b) => a + b),
      average = (sum / bufferLength) * 2

    this.ctx.clearRect(0, 0, this.e.canvas.width, this.e.canvas.height)
    this.ctx.fillStyle = "lightgreen"
    this.ctx.fillRect(
      0,
      this.e.canvas.height - average,
      this.e.canvas.width,
      this.e.canvas.height
    )
  }
}
customElements.define("volume-meter", VolumeMeter)
