export default class EffectorBoard extends HTMLElement {
  static get observedAttributes() {
    return ["effectors"]
  }
  constructor(input, output) {
    super()
    const shadow = this.attachShadow({ mode: "open" })
    const style = document.createElement("style")
    this._input = null
    this._output = null
    this.e = {
      container: document.createElement("div"),
      dropbox: document.createElement("div"),
      emptybox: document.createElement("empty-box"),
    }
    style.textContent = this.style()
    this.setAttribute("effectors", "")
    this.e.container.classList.add("container")
    this.e.dropbox.classList.add("drop", "box")

    this.e.container.appendChild(this.e.emptybox)
    shadow.appendChild(this.e.container)
    shadow.appendChild(style)
  }
  attributeChangedCallback(_name, _oldValue, newValue) {
    newValue.split(",").forEach(value => {
      document.querySelector(value)
    })
  }
  style = () => `
  .container{
    border: solid 1px black;
    margin: 10px;
    padding: 10px;
  }
  `
}

customElements.define("effector-board", EffectorBoard)
