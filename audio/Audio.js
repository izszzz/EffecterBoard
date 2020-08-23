export default class Audio {
  constructor(ctx, stream) {
    this._ctx = ctx
    this._stream = stream
    this._source = null
    this._gainNode = null
    this._destination = null
    this.e = {
      audioInputSelect: document.querySelector("audio-select[kind=input]"),
      audioOutputSelect: document.querySelector("audio-select[kind=output]"),
    }
  }

  get ctx() {
    return this._ctx
  }
  set ctx(val) {
    this._ctx = this.setterCheck(val, AudioContext)
  }

  get stream() {
    return this._stream
  }
  set stream(val) {
    this._stream = this.setterCheck(val, MediaStream)
  }

  get source() {
    return this._source
  }
  set source(val) {
    this._source = this.setterCheck(val, MediaStreamAudioSourceNode)
  }

  get gainNode() {
    return this._gainNode
  }
  set gainNode(val) {
    this._gainNode = this.setterCheck(val, GainNode)
  }

  get destination() {
    return this._destination
  }
  set destination(val) {
    this._destination = this.setterCheck(val, AudioDestinationNode)
  }

  setterCheck(val, ins) {
    if (val instanceof ins) {
      return val
    } else {
      throw new Error(val + " is not a " + ins.name)
    }
  }

  input() {
    this.e.audioInputSelect.setAttribute("mounted", "")
    this.e.audioOutputSelect.setAttribute("mounted", "")
    this.source = this.ctx.createMediaStreamSource(this.stream)
    this.destination = this.ctx.destination
  }

  masterVolume() {
    this.gainNode = this.ctx.createGain()
    this.gainNode.gain.value = 0.1
  }

  output() {
    ;[this.source, this.gainNode, this.destination].reduce((a, b) =>
      a.connect(b)
    )
  }

  play() {
    this.input()
    this.masterVolume()
    this.output()
  }
}
