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
    const analyser = globalThis.audioClass.analyser,
      bufferLength = analyser.frequencyBinCount,
      dataArray = new Uint8Array(bufferLength)
    setInterval(() => this.draw(analyser, dataArray, bufferLength), 800)
  }
  draw(analyser, dataArray, bufferLength) {
    analyser.getByteFrequencyData(dataArray)
    console.log(dataArray[80])
    const average = dataArray.reduce((a, b) => a + b) / bufferLength
    console.log(average)
    this.ctx.clearRect(0, 0, this.e.canvas.width, this.e.canvas.height)
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(
      0,
      100 - average,
      this.e.canvas.width,
      this.e.canvas.height
    )
  }
}
customElements.define("volume-meter", VolumeMeter)
