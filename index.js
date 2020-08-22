import Audio from "./audio/Audio.js"
import "./components/AudioSelect.js"
;(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  })
  const ctx = new AudioContext()

  setAudio(ctx, stream)
})()

const setAudio = (ctx, stream) => {
  globalThis.audioClass = new Audio(ctx, stream)
  globalThis.audioClass.play()
}
