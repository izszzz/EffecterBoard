export default class USBSelect {
  constructor() {
    navigator.usb.requestDevice({ filters: [] })
  }
}
