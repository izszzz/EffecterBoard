export default class MuteBtn extends HTMLElement {
  constructor() {
    super()
    this._gainValue = null
    const shadow = this.attachShadow({ mode: "open" }),
      style = document.createElement("style")
    style.textContent = this.style()
    this.addEventListener("click", this.onClick)
    shadow.appendChild(style)
  }

  get gainValue() {
    return this._gainValue
  }
  set gainValue(val) {
    this._gainValue = val
  }

  onClick = () => {
    this.toggleAttribute("active")
    globalThis.audioClass.masterGain.gain.value=this.hasAttribute("active") ? 0 : this.gainValue
  }

  style = () => `
    :host{
      user-select: none;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      line-height: 25px;
      width: 25px;
      height: 25px;
      margin: 0;
      background: gray;
      border-radius: 3px;
      cursor: pointer;
    }
    :host:before{
      content: "M";
      font-weight: 600;
      color: white;
    }
    :host([active]){
      background: #ff4f4f;
    }
  `
}
customElements.define("mute-btn", MuteBtn)
