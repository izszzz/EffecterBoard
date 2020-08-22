export default class AudioSelect extends HTMLElement {
  static get observedAttributes() {
    return ["ctx", "stream"]
  }
  constructor() {
    super()
    this._ctx = {}
    this._stream = {}
    this._audio = {} //Audio class
    this.e = { select: document.createElement("select") }
    this.e.select.addEventListener("change", this.selectAudio)
    const shadow = this.attachShadow({ mode: "open" })
    shadow.appendChild(this.e.select)
  }

  attributeChangedCallback() {
    if (this.hasAttribute("ctx", "stream")) {
      this.loadAudio()
    }
  }

  get ctx() {
    return this._ctx
  }

  set ctx(value) {
    this._ctx = value
    this.setAttribute("ctx", "")
  }

  get stream() {
    return this._stream
  }

  set stream(value) {
    this._stream = value
    this.setAttribute("stream", "")
  }

  async getConnectedDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices(),
      selectedDevices = [...devices].filter(
        device => device.kind === "audio" + this.getAttribute("kind")
      )
    return selectedDevices
  }

  createOptionTag(devices) {
    ;[...devices].forEach(device => {
      const currentDeviseLabel = this.stream.getAudioTracks()[0].label,
        option = document.createElement("option")
      if (currentDeviseLabel === device.label) {
        option.setAttribute("selected", "")
      }
      option.setAttribute("value", device.deviceId)
      option.innerText = device.label
      this.e.select.appendChild(option)
    })
  }

  async loadAudio() {
    this.createOptionTag(await this.getConnectedDevices())
  }

  async selectAudio(e) {
    globalThis.audioClass.ctx.close()
    globalThis.audioClass.stream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: e.currentTarget.value },
    })
    globalThis.audioClass.ctx = new AudioContext()
    globalThis.audioClass.play()
  }
}
customElements.define("audio-select", AudioSelect)
