# Colors and measurement units

## Index

- [Colors and measurement units](#colors-and-measurement-units)
  - [Index](#index)
  - [Hexadecimal syntax](#hexadecimal-syntax)
    - [Web Safe colors](#web-safe-colors)
  - [RGB syntax](#rgb-syntax)
  - [Named colors](#named-colors)
  - [Measurement units](#measurement-units)
    - [em - relative](#em---relative)
    - [% (percent) - relative](#-percent---relative)
    - [cm (centimeters) - absolute](#cm-centimeters---absolute)
    - [mm (millimeters) - absolute](#mm-millimeters---absolute)
    - [in (inches) - absolute](#in-inches---absolute)
    - [px (pixels) - absolute](#px-pixels---absolute)
    - [pt (points) - absolute](#pt-points---absolute)
    - [pc (picas) - absolute](#pc-picas---absolute)

## Hexadecimal syntax

- Extremely common because it is supported by most browsers.
- Syntax is `#RRGGBB`.
- `RR` is red, `GG` is green, and `BB` is blue.
- Scale is from `00` to `FF`, in this order: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F`.
- The nearer to `00`, the less light, the darker the color.
- It is not case sensitive, so `#FF0000` is the same as `#ff0000`.
- For each color, it can have a value from `0` to `255`, so `256` possible values.
- [W3Schools color picker](https://www.w3schools.com/colors/colors_picker.asp)

~~~css
body {
  background-color: #FF0000;
}
~~~

### Web Safe colors

- In the old days, not all browsers supported the full range of colors.
- The web safe colors are 216 colors that are supported by all browsers.
- [Web safe colors](https://htmlcolorcodes.com/color-chart/web-safe-color-chart/)
- When pairs of hex digits are the same, it can be shortened to one digit, so `#FF0000` can be written as `#F00`.
- Can be composed by: `0`, `3`, `6`, `9`, `C` and `F`.

~~~css
body {
  background-color: #F00;
}
~~~

## RGB syntax

- Syntax is `rgb(red, green, blue)`.
- Goes from `0`to `255`, so `256` possible values.
- The nearer to `0`, the less light, the darker the color.
- Can also be written with percentages, so `rgb(100%, 0%, 0%)` is the same as `rgb(255, 0, 0)`.

~~~css
div {
  background-color: rgb(255, 0, 0);
}

p {
  background-color: rgb(100%, 0%, 0%);
}
~~~

## Named colors

- Browsers have a list of 165 keywords for colors.
- [MDN list of named colors](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color)

~~~css
div {
  background-color: red;
}
~~~

## Measurement units

### em - relative

- Relative to the font size of the element.
- If not specified, the font size is `16px` as a default.
- If the font size is `16px`, `1em` is `16px`, `2em` is `32px`, etc.

~~~css
p {
  font-size: 1em;
}
~~~

### % (percent) - relative

- Relative to the parent element.
- If the parent element has a width of `100px`, `50%` is `50px`.
- It can be used for `width`, `height`, `margin`, `padding`, `font-size`, etc.

~~~css
div {
  width: 50%;
}
~~~

### cm (centimeters) - absolute

- Absolute measurement unit.
- `1cm` is `37.79527559055118px`.

~~~css
div {
  width: 10cm;
}
~~~

### mm (millimeters) - absolute

- Absolute measurement unit.
- `1mm` is `3.779527559055118px` or `0.1cm`.

~~~css
div {
  width: 10mm;
}
~~~

### in (inches) - absolute

- Absolute measurement unit.
- `1in` is `96px` or `2.54cm`.

~~~css
div {
  width: 10in;
}
~~~

### px (pixels) - absolute

- Absolute measurement unit.
- `1px` is `1/96th` of `1in`, so `96px` is `1in`.

~~~css
div {
  width: 10px;
}
~~~

### pt (points) - absolute

- Absolute measurement unit.
- `1pt` is `1/72th` of `1in`, so `72pt` is `1in`.

~~~css
div {
  width: 10pt;
}
~~~

### pc (picas) - absolute

- Absolute measurement unit.
- `1pc` is `12pt`, so `6pc` is `72pt` or `1in`.

~~~css
div {
  width: 10pc;
}
~~~
