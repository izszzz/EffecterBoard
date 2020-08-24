import Audio from "./audio/Audio.js"
import "./components/input/AudioSelect/AudioSelect.js"
import "./components/input/VolumeRange/VolumeRange.js"
import "./components/track/HorizontalTrack/HorizontalTrack.js"
import "./components/effector_board/EffectorBoard.js"
import "./components/effector_board/EmptyBox.js"
import "./components/modal/BasicModal.js"
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
