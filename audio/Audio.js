export default class Audio {
  constructor(ctx, stream) {
    this._ctx = ctx
    this._stream = stream
    this._source = null
    this._masterGain = null
    this._panner = null
    this._effectorBoardOutput = null
    this._destination = null
    this.e = {
      audioInputSelect: document.querySelector("audio-select[kind=input]"),
      audioOutputSelect: document.querySelector("audio-select[kind=output]"),
      horizontalTrack: document.querySelector("horizontal-track"),
      effectorBoard: document.querySelector("effector-board"),
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

  get masterGain() {
    return this._masterGain
  }
  set masterGain(val) {
    this._masterGain = this.setterCheck(val, GainNode)
  }

  get panner() {
    return this._pan
  }
  set panner(val) {
    this._pan = val
  }

  get destination() {
    return this._destination
  }
  set destination(val) {
    this._destination = this.setterCheck(val, AudioDestinationNode)
  }

  get effectorBoardOutput() {
    return this._effectorBoardOutput
  }
  set effectorBoardOutput(val) {
    this._effectorBoardOutput = val
  }

  setterCheck(val, ins) {
    if (val instanceof ins) {
      return val
    } else {
      throw new Error(val + " is not a " + ins.name)
    }
  }

  input() {
    ;[this.e.audioInputSelect, this.e.audioOutputSelect].forEach(e =>
      e.setAttribute("mounted", "")
    )
    this.panner = this.ctx.createStereoPanner()
    this.source = this.ctx.createMediaStreamSource(this.stream)
    this.destination = this.ctx.destination
  }

  connectInput() {
    ;[this.source, this.panner, this.masterGain].reduce((a, b) => a.connect(b))
  }

  disconnectInput() {
    ;[this.source, this.panner, this.masterGain].reduce((a, b) =>
      a.disconnect(b)
    )
  }

  masterVolume() {
    this.masterGain = this.ctx.createGain()
    this.e.horizontalTrack.gain = this.masterGain.gain
    this.connectInput()
  }

  output() {
    this.effectorBoardOutput
      ? this.effectorBoardOutput.connect(this.destination)
      : this.masterGain.connect(this.destination)
  }

  load() {
    this.input()
    this.masterVolume()
    this.output()
  }
}
