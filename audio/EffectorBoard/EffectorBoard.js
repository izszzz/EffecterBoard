export default class EffectorBoard {
  constructor() {}
  on() {
    const audioCtx = globalThis.audioClass.ctx
    const oscillator = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()
    gainNode.gain.value = 20
    gainNode.connect(audioCtx.destination)
  }
  off() {}
  input() {}
  output() {}
}
