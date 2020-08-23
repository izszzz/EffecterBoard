import Audio from "./audio/Audio.js"
import EffectorBoard from "./audio/EffectorBoard/EffectorBoard.js"
import "./components/AudioSelect.js"
;(async () => {
  let stream, ctx
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    })
    ctx = new AudioContext()
  } catch (e) {
    console.log(e)
  }
  globalThis.audioClass = new Audio(ctx, stream)
  globalThis.audioClass.play()
})()
