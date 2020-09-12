export default class AudioSelect extends HTMLElement {
  static get observedAttributes() {
    return ["mounted"]
  }
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: "open" })
    let style
    ;[this.select, style] = ["select", "style"].map(tag =>
      document.createElement(tag)
    )
    ;[this.select, style].forEach(e => shadow.appendChild(e))
    style.textContent = this.style()
    this.select.addEventListener("change", this.selectAudio)
  }

  attributeChangedCallback(name) {
    if (name === "mounted") {
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
      } else {
        throw new Error('audio-select tag not have attribute "kind"')
      }
    })

  createOptionTag(devices) {
    this.select.textContent = ""
    ;[...devices].forEach(device => {
      const option = document.createElement("option")
      globalThis.audioClass.stream.getAudioTracks()[0].label === device.label &&
        option.setAttribute("selected", "")
      option.setAttribute("value", device.deviceId)
      option.innerText = device.label
      this.select.appendChild(option)
    })
  }

  async loadAudio() {
    this.createOptionTag(await this.getConnectedDevices())
  }

  async selectAudio(e) {
    let audio = globalThis.audioClass
    audio.stream.getAudioTracks().forEach(track => track.stop())
    audio.disconnectInput()
    try {
      audio.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: e.currentTarget.value,
          ...globalThis.audioConstraint,
        },
      })
      audio.source = audio.ctx.createMediaStreamSource(audio.stream)
    } catch (e) {
      console.log(e)
    }
    audio.connectInput()
  }
  style = () => ``
}
customElements.define("audio-select", AudioSelect)
