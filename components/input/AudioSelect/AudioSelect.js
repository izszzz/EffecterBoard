export default class AudioSelect extends HTMLElement {
  static get observedAttributes() {
    return ["mounted"]
  }
  constructor() {
    super()
    this.e = { select: document.createElement("select") }
    this.e.select.addEventListener("change", this.selectAudio)
    const shadow = this.attachShadow({ mode: "open" })
    shadow.appendChild(this.e.select)
  }

  attributeChangedCallback() {
    if (this.hasAttribute("mounted")) {
      this.loadAudio()
    }
  }

  getConnectedDevices = async () =>
    [...(await navigator.mediaDevices.enumerateDevices())].filter(device => {
      const kind = this.getAttribute("kind")
      if (kind === "input") {
        return device.kind === "audioinput"
      } else if (kind === "output") {
        return device.kind === "audiooutput" && device.deviceId === "default"
      }
    })

  createOptionTag(devices) {
    this.e.select.textContent = ""
    ;[...devices].forEach(device => {
      const option = document.createElement("option")
      globalThis.audioClass.stream.getAudioTracks()[0].label === device.label &&
        option.setAttribute("selected", "")
      option.setAttribute("value", device.deviceId)
      option.innerText = device.label
      this.e.select.appendChild(option)
    })
  }

  async loadAudio() {
    this.createOptionTag(await this.getConnectedDevices())
  }

  async selectAudio(e) {
    let audio = globalThis.audioClass
    audio.stream.getAudioTracks().forEach(track => track.stop())
    try {
      audio.stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: e.currentTarget.value },
      })
    } catch (e) {
      console.log(e)
    }
    audio.play()
  }
}
customElements.define("audio-select", AudioSelect)
