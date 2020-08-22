export default class Audio {
  constructor(ctx, stream) {
    this._ctx = ctx
    this._stream = stream
    this.streamSource = null
    this.e = {
      audioSelect: document.querySelector("audio-select"),
    }
  }
  get ctx() {
    return this._ctx
  }
  set ctx(value) {
    this._ctx = value
  }
  get stream() {
    return this._stream
  }
  set stream(value) {
    this._stream = value
  }

  input() {
    this.e.audioSelect.ctx = this.ctx
    this.e.audioSelect.stream = this.stream
  }

  streamAudio(stream) {
    this.streamSource = this.ctx.createMediaStreamSource(stream)
  }

  output() {
    this.streamSource.connect(this.ctx.destination)
  }

  play() {
    this.input()
    this.streamAudio(this.stream)
    this.output()
  }
}
