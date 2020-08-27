# VolumeRange

## Property

| summary       | name  | value | default | type   |
| ------------- | ----- | ----- | ------- | ------ |
| set/get value | value | none  | null    | number |
| onchange      | value | none  | null    | Value  |

## Attribute

| summary                   | attribute | value  | default | type   |
| ------------------------- | --------- | ------ | ------- | ------ |
| mounted after rerendering | mounted   | none   | none    | none   |
| volumeRange value         | value     | number | 100     | number |
| volumeRange max           | max       | number | 150     | number |
| volumeRange min           | min       | number | 0       | number |

## Event

can pass function and this is do when onchange

pass function first arg is volumeRange can get

```js
const volume_range = document.querySelector("volume-range")
changeValue = value => console.log(value)
volume_range.onchange = changeValue
```
