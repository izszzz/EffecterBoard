export default class VolumeRange {
  constructor() {
    const shadow = this.attachShadow({ mode: "open" })
    this.e = {
      container: document.createElement("container"),
      input: document.createElement("input"),
      span: document.createElement("span"),
      style: document.createElement("style"),
    }
    this.e.container.appendChild(this.e.input)
    shadow.appendChild(input)
  }
}
