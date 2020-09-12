export default class VolumeMeter extends HTMLElement {
  constructor() {
    super()
    this.canvas = document.createElement("canvas")
    this.canvas.width = 20
    this.canvas.height = 100
    this.ctx = this.canvas.getContext("2d")
    const shadow = this.attachShadow({ mode: "open" })
    shadow.appendChild(this.canvas)
  }
  connectedCallback() {
    const analyser = globalThis.audioClass.analyser,
      bufferLength = analyser.frequencyBinCount,
      dataArray = new Uint8Array(bufferLength),
      { height, width } = this.canvas
    
    this.ctx.fillRect(
      0,
      height,
      width,
      height
    )
    setInterval(() => this.draw(analyser, dataArray, bufferLength), 200)
  }
  draw(analyser, dataArray, bufferLength) {
    analyser.getByteFrequencyData(dataArray)
    const sum = dataArray.reduce((a, b) => a + b),
      average = (sum / bufferLength) * 2,
      { height, width } = this.canvas
    this.ctx.clearRect(0, 0, width, height)
    this.ctx.fillStyle = "lightgreen"
    this.ctx.fillRect(
      0,
      height - average,
      width,
      height
    )
  }
}
customElements.define("volume-meter", VolumeMeter)
