# HTML page & textual elements formatting

## Index

- [HTML page \& textual elements formatting](#html-page--textual-elements-formatting)
  - [Index](#index)
  - [Formatting the background](#formatting-the-background)
    - [background-color](#background-color)
    - [background-image](#background-image)
    - [background-repeat](#background-repeat)
    - [background-attachment](#background-attachment)
    - [background-position](#background-position)
    - [background-size](#background-size)
    - [background-origin](#background-origin)
    - [background-clip](#background-clip)
    - [background shorthand](#background-shorthand)
    - [Applying multiple backgrounds](#applying-multiple-backgrounds)
  - [Formatting the border](#formatting-the-border)
    - [border-width](#border-width)
    - [border-style](#border-style)
    - [border-color](#border-color)
    - [border shorthand](#border-shorthand)
  - [Formatting the margin and padding](#formatting-the-margin-and-padding)
    - [Different ways of declaring margin and padding](#different-ways-of-declaring-margin-and-padding)
  - [Formatting the textual elements](#formatting-the-textual-elements)
    - [font-family](#font-family)
    - [font-size](#font-size)
    - [font-style](#font-style)
    - [font-variant](#font-variant)
    - [font-weight](#font-weight)
    - [line-height](#line-height)
    - [text-align](#text-align)
    - [text-decoration](#text-decoration)
    - [text-indent](#text-indent)
    - [text-transform](#text-transform)
    - [@font-face](#font-face)
    - [font shorthand](#font-shorthand)

## Formatting the background

### background-color

Defines the background color of an element.

~~~css
body {
  background-color: #000;
}
~~~

### background-image

Defines the background image of an element. By the default, the browser will repeat the image until it fills the entire element, as many times as necessary.

~~~css
body {
  background-image: url("img_tree.png");
}
~~~

### background-repeat

Defines if/how the background image will be repeated.

- `repeat`: The background image will be repeated both vertically and horizontally. This is default.
- `no-repeat`: The background-image will not be repeated.
- `repeat-x`: The background image will be repeated only horizontally.
- `repeat-y`: The background image will be repeated only vertically.
- `space`: The background image will be repeated both vertically and horizontally. The images will be spaced out so that there is equal space between them.
- `round`: The background image will be repeated both vertically and horizontally. The image will be scaled to fit the screen.

~~~css
body {
  background-image: url("img_tree.png");
  background-repeat: no-repeat;
}
~~~

### background-attachment

Defines if the background image is fixed or scrolls with the page.

- `scroll`: The background image scrolls with the page. This is default.
- `fixed`: The background image is fixed with respect to the viewport.

~~~css
body {
  background-image: url("img_tree.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
}
~~~

### background-position

Defines the starting position of a background image.

- `left top`: The background image is placed at the top left corner of the element. This is default.
- `left center`, `left bottom`, `center top`, `center center`, `center bottom`, `right top`, `right center`, `right bottom`: The background image is placed in the corresponding position.
- `x% y%`: The background image is placed according to the given percentages. The first value defines the horizontal position and the second value defines the vertical position. The values can be negative, in which case the image is placed outside the element.
- `xpos ypos`: same as above, but using pixels, points, centimeters, etc.
- `initial`: Sets this property to its default value, `left top`.
- `inherit`: Inherits this property from its parent element. Read about inherit.

~~~css
body {
  background-image: url("img_tree.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: right bottom;
}
~~~

### background-size

Defines the size of the background image.

- `auto`: The background image is not resized. This is default.
- `length`: The background image is resized to the specified width and height. The image may be stretched or squashed.
- `%`: The background image is resized to the specified percentage of the size of the element. The image may be stretched or squashed.
- `cover`: The background image is resized to cover the entire element, while preserving its aspect ratio. The image may be stretched or squashed.
- `contain`: The background image is resized to make sure the image is fully visible. The entire image will not be visible if the aspect ratio of the image is not the same as the aspect ratio of the element. The image may be stretched or squashed.
- `initial`: Sets this property to its default value, `auto`.
- `inherit`: Inherits this property from its parent element.

~~~css
body {
  background-image: url("img_tree.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: right bottom;
  background-size: 100px 100px;
}
~~~

### background-origin

Defines how the background image is positioned.

- `border-box`: The background image is positioned with respect to the border edge of the element, so it covers the padding and border area.
- `padding-box`: The background image is positioned with respect to the padding edge of the element, so it covers the padding area. This is default.
- `content-box`: The background image is positioned with respect to the content edge of the element, so it does not cover the padding and border area.

### background-clip

Defines the painting area of the background image.

- `border-box`: The background image is painted within (clipped to) the border edge of the element, so it covers the padding and border area. This is default.
- `padding-box`: The background image is painted within (clipped to) the padding edge of the element, so it covers the padding area.
- `content-box`: The background image is painted within (clipped to) the content edge of the element, so it does not cover the padding and border area.
- `initial`: Sets this property to its default value, `border-box`.

### background shorthand

- The `background` property is a shorthand property for setting all the background properties in one declaration.
- Syntax: `background: [background-color] || [background-image] || [background-repeat] || [background-attachment] || [background-position]`

~~~css
body {
  background: #000 url("img_tree.png") no-repeat fixed right bottom;
}
~~~

> **Note:** The order of the values is important. If you don't declare one of them, the default value will be used.

### Applying multiple backgrounds

With CSS3 you can apply more than one background image to an element. The background images are layered on top of each other, respecting the order in which they are declared.

~~~css
body {
  background-image: url("img_tree.png"), url("img_flower.png");
  background-position: right bottom, left top;
  background-repeat: no-repeat, no-repeat;
}
~~~

## Formatting the border

### border-width

Defines the width of the border.

- `medium`: A medium border. This is default.
- `thin`: A thin border.
- `thick`: A thick border.
- `length`: The width of the border is the given length. The length can be in pixels (px), points (pt), centimeters (cm), etc.
- `initial`: Sets this property to its default value, `medium`.
- `inherit`: Inherits this property from its parent element.

~~~css
p {
  border-width: 5px;
}
~~~

### border-style

Defines the style of the border.

- `none`: No border. This is default.
- `hidden`: Defines a hidden border.
- `dotted`: Defines a dotted border.
- `dashed`: Defines a dashed border.
- `solid`: Defines a solid border.
- `double`: Defines a double border.
- `groove`: Defines a 3D grooved border. The effect depends on the border-color value.
- `ridge`: Defines a 3D ridged border. The effect depends on the border-color value.
- `inset`: Defines a 3D inset border. The effect depends on the border-color value.
- `outset`: Defines a 3D outset border. The effect depends on the border-color value.

~~~css
p {
  border-style: solid;
}
~~~

### border-color

Defines the color of the border. Default value is the color of the element.

~~~css
p {
  border-color: red;
}
~~~

### border shorthand

- The `border` property is a shorthand property for setting all the border properties in one declaration.
- Syntax: `border: [border-width] [border-style] [border-color]`

~~~css
p {
  border: 5px solid red;
}
~~~

## Formatting the margin and padding

- The `margin` property is used to generate space around an element, outside of any defined borders.
- The `padding` property is used to generate space around an element's content, inside of any defined borders.
- You can set the margin and padding for all four sides of an element (top, right, bottom, and left) with one declaration, or individually for each side (`margin-top`, `margin-right`, `margin-bottom`, `margin-left`, `padding-top`, `padding-right`, `padding-bottom`, and `padding-left`).
- Same can be done with the `border` property, that stands between the margin and the padding.
- Negative values are allowed for the `margin` property, but not for the `padding` property.

### Different ways of declaring margin and padding

- `property: value;`: Sets all four sides of the element to the same value.

~~~css
p {
  margin: 50px;
}
~~~

- `property: value1 value2;`: Sets the top and bottom to `value1` and the left and right to `value2`.

~~~css
p {
  margin: 50px 100px;
}
~~~

- `property: value1 value2 value3;`: Sets the top to `value1`, the left and right to `value2`, and the bottom to `value3`.

~~~css
p {
  margin: 50px 100px 150px;
}
~~~

- `property: value1 value2 value3 value4;`: Sets the top to `value1`, the right to `value2`, the bottom to `value3`, and the left to `value4`.

~~~css
p {
  margin: 50px 100px 150px 200px;
}
~~~

## Formatting the textual elements

### font-family

Defines the font family for text.

- `font-family: value;`: Sets the font family to the given value.
- `font-family: value1, value2, value3, ...;`: Sets the font family to the given value, if the first value is not available.

~~~css
p {
  font-family: "Times New Roman", Times, serif;
}
~~~

### font-size

Defines the font size of text.

- `xx-small`: Defines extra small text.
- `x-small`: Defines small text.
- `small`: Defines smaller text.
- `medium`: Defines medium-sized text. This is default.
- `large`: Defines larger text.
- `x-large`: Defines large text.
- `xx-large`: Defines extra large text.
- `smaller`: Defines smaller text than the parent element.
- `larger`: Defines larger text than the parent element.
- `length`: Defines the font size in pixels, points, centimeters, etc.
- `%`: Defines the font size in percent of the parent element's font size.
- `initial`: Sets this property to its default value, `medium`.
- `inherit`: Inherits this property from its parent element.

~~~css
p {
  font-size: 20px;
}
~~~

### font-style

Defines the font style for text.

- `normal`: Defines normal text. This is default.
- `italic`: Defines italic text.
- `oblique`: Defines oblique text.
- `initial`: Sets this property to its default value, `normal`.
- `inherit`: Inherits this property from its parent element.

~~~css
p {
  font-style: italic;
}
~~~

### font-variant

Defines whether or not a text should be displayed in a small-caps font.

- `normal`: Defines normal text. This is default.
- `small-caps`: Defines small-caps text.
- `initial`: Sets this property to its default value, `normal`.
- `inherit`: Inherits this property from its parent element.

### font-weight

Defines the weight of a font.

- `normal`: Defines a normal font weight. This is default.
- `bold`: Defines a bold font weight.
- `bolder`: Defines a heavier font weight.
- `lighter`: Defines a lighter font weight.
- `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`: Defines a font weight between `100` and `900`.
- `initial`: Sets this property to its default value, `normal`.
- `inherit`: Inherits this property from its parent element.

~~~css
p {
  font-weight: bold;
}
~~~

### line-height

Defines the line height.

- `normal`: Defines a normal line height. This is default.
- `number`: Defines the line height as a multiple of the font size of the element.
- `length`: Defines the line height in pixels, points, centimeters, etc.
- `%`: Defines the line height in percent of the font size of the element.
- `initial`: Sets this property to its default value, `normal`.
- `inherit`: Inherits this property from its parent element.

~~~css
p {
  line-height: 1.5;
}
~~~

### text-align

Defines the horizontal alignment of text.

- `left`: Defines left-aligned text. This is default.
- `right`: Defines right-aligned text.
- `center`: Defines centered text.
- `justify`: Defines justified text.
- `initial`: Sets this property to its default value, `left`.
- `inherit`: Inherits this property from its parent element.

~~~css
p {
  text-align: center;
}
~~~

### text-decoration

Defines the decoration added to text.

- `none`: Defines no decoration. This is default.
- `underline`: Defines a line below the text.
- `overline`: Defines a line above the text.
- `line-through`: Defines a line through the text.
- `initial`: Sets this property to its default value, `none`.
- `inherit`: Inherits this property from its parent element.

~~~css
p {
  text-decoration: underline;
}
~~~

### text-indent

Defines the indentation of the first line in a text-block.

- `length`: Defines the indentation in pixels, points, centimeters, etc.
- `%`: Defines the indentation in percent of the width of the containing block.
- `initial`: Sets this property to its default value, `0`.
- `inherit`: Inherits this property from its parent element.

~~~css
p {
  text-indent: 50px;
}
~~~

### text-transform

Defines how to capitalize text.

- `none`: Defines no capitalization. This is default.
- `capitalize`: Defines that the first letter of each word should be capitalized.
- `uppercase`: Defines that all letters should be capitalized.
- `lowercase`: Defines that all letters should be in lower case.
- `initial`: Sets this property to its default value, `none`.
- `inherit`: Inherits this property from its parent element.

### @font-face

Defines a custom font.

~~~css
@font-face {
  font-family: "MyWebFont";
  src: url("myfont.woff2") format("woff2"),
       url("myfont.woff") format("woff");
}
~~~

> **Note:** Always use lowercase for font names.

### font shorthand

The `font` shorthand property sets all the font properties in one declaration.

- `font: style variant weight size/line-height family;`

~~~css
p {
  font: italic small-caps bold 12px/30px Georgia, serif;
}
~~~
