export default class ChannelBtn extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" }),
      div = document.createElement("div"),
      style = document.createElement("style")
    style.textContent = this.style()
    this.addEventListener("click", this.onClick)
    ;[div, style].forEach(e => shadow.appendChild(e))
  }

  connectedCallback() {
    globalThis
  }

  onClick = () => {
    this.toggleAttribute("active")
    if (this.hasAttribute("active")) {
    } else {
    }
  }

  style = () => `
    :host{
        user-select: none;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: 25px;
        height: 25px;
        margin: 0;
        background: gray;
        border-radius: 3px;
        cursor: pointer;
    }
    div{
        position: absolute;
        display: inline-block;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 5px;
        height: 5px;
        margin: auto;
        background: white;
        border-radius: 50%;
        font-weight: 600;
    }
    :host:before{
        content: "";
        position: absolute;
        display: inline-block;
        top: 0;
        bottom: 1px;
        right: 1px;
        left: 0;
        width: 9px;
        height: 9px;
        margin: auto;
        border-top: solid 2px transparent;
        border-bottom: solid 2px transparent;
        border-right: solid 2px white;
        border-left: solid 2px white;
        border-radius: 50%;
    }
    :host:after{
        content: "";
        position: absolute;
        display: inline-block;
        top: 0;
        bottom: 1px;
        right: 1px;
        left: 0;
        width: 17px;
        height: 17px;
        margin: auto;
        border-top: solid 2px transparent;
        border-bottom: solid 2px transparent;
        border-right: solid 2px white;
        border-left: solid 2px white;
        border-radius: 50%;
    }
    :host([active]) div{
        right: initial;
        left: 4px;
    }
    :host([active]):before{
        right: initial;
        left: 1px;
        border-left: solid 2px transparent;
    }
    :host([active]):after{
        right: initial;
        left: -2px;
        border-left: solid 2px transparent;
    }
  `
}
customElements.define("channel-btn", ChannelBtn)
