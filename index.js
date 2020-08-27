import Audio from "./audio/Audio.js"
import "./components/input/AudioSelect/AudioSelect.js"
import "./components/track/HorizontalTrack/HorizontalTrack.js"
import "./components/effector_board/EffectorBoard.js"
import "./components/modal/BasicModal.js"
;(async () => {
  let stream, ctx
  globalThis.audioConstraint = {
    echoCancellation: false,
    noiseSuppression: false,
  }
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: globalThis.audioConstraint,
    })
    ctx = new AudioContext()
  } catch (e) {
    console.log(e)
  }
  globalThis.audioClass = new Audio(ctx, stream)
  globalThis.audioClass.load()
})()
