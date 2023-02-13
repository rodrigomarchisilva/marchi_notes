# CSS

## Index

- [CSS](#css)
  - [Index](#index)
  - [Places to learn CSS](#places-to-learn-css)
  - [Concepts](#concepts)
  - [Inline CSS](#inline-css)
  - [Internal CSS](#internal-css)
  - [External CSS](#external-css)
  - [Colors](#colors)
    - [17 Named Colors for HTML5](#17-named-colors-for-html5)
    - [Hexadecimal Colors](#hexadecimal-colors)
    - [RGB Colors](#rgb-colors)
    - [HSL Colors](#hsl-colors)
  - [Background](#background)
  - [Text](#text)
  - [Fonts](#fonts)

## Places to learn CSS

- [W3C](https://www.w3.org/Style/CSS/Overview.en.html) Organization that develops web standards.
- [W3Schools](https://www.w3schools.com/css/) Online web tutorials.
- [Markup Validation Service](https://validator.w3.org/) Validates HTML and CSS.

## Concepts

- CSS stands for `Cascading Style Sheets`.
- CSS isn't a programming language. It is a style sheet language.
- The extension for CSS files is `.css`.

**Example:**

~~~css
body {
  color: red;
}
~~~

> **Note:** The above example will make all text in the body red.

## Inline CSS

Used in an HTML element to define CSS styles for the current element.

~~~html
<p style="color: red;">This is a paragraph.</p>
~~~

## Internal CSS

Used inside the `<head>` element of an HTML page to define CSS styles for the current page.

~~~html
<head>
  <style>
    p {
      color: red;
    }
  </style>
</head>
~~~

## External CSS

Used inside the `<head>` element of an HTML page to link to an external CSS file.

~~~html
<head>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
~~~

- `rel="stylesheet"` defines the relationship between the HTML page and the CSS file.
- `type="text/css"` defines the type of the CSS file.
- `href="styles.css"` defines the path to the CSS file.

## Colors

### 17 Named Colors for HTML5

There are 17 named colors for HTML.

| Color | Hexadecimal | RGB |
| --- | --- | --- |
| aqua | #00ffff | rgb(0, 255, 255) |
| black | #000000 | rgb(0, 0, 0) |
| blue | #0000ff | rgb(0, 0, 255) |
| fuchsia | #ff00ff | rgb(255, 0, 255) |
| gray | #808080 | rgb(128, 128, 128) |
| green | #008000 | rgb(0, 128, 0) |
| lime | #00ff00 | rgb(0, 255, 0) |
| maroon | #800000 | rgb(128, 0, 0) |
| navy | #000080 | rgb(0, 0, 128) |
| olive | #808000 | rgb(128, 128, 0) |
| purple | #800080 | rgb(128, 0, 128) |
| red | #ff0000 | rgb(255, 0, 0) |
| silver | #c0c0c0 | rgb(192, 192, 192) |
| teal | #008080 | rgb(0, 128, 128) |
| white | #ffffff | rgb(255, 255, 255) |
| yellow | #ffff00 | rgb(255, 255, 0) |

> **Note:** CSS3 has 147 named colors.

### Hexadecimal Colors

- #RRGGBB
  - RR (red), GG (green), BB (blue)
- It goes from 00 to FF
- **Example:** `#FF0000` (red)

### RGB Colors

- `rgb(red, green, blue)`
- It goes from 0 to 255
- **Example:**  `rgb(255, 0, 0)` (red)

### HSL Colors

- `hsl(hue, saturation, lightness)`
- Hue: 0 to 360
- **Example:** `hsl(0, 100%, 50%)` (red)

## Background

- `background-color: red;` Defines the background color of an element.
- `background-image: url("img_tree.png");` Defines an image as the background of an element.
- `background-repeat: no-repeat;` Defines how the background image will be repeated.
- `background-position: right top;` Defines the starting position of a background image.
- `background-attachment: fixed;` Defines whether a background image is fixed or scrolls with the rest of the page.
- `background: red url("img_tree.png") no-repeat right top;` A shorthand property for all the above background properties.

## Text

- `color: red;` Defines the color of text.
- `text-align: center;` Defines the horizontal alignment of text. (left, right, center, justify)
- `text-decoration: underline;` Defines the decoration added to text. (none, underline, overline, line-through, blink)
- `text-transform: uppercase;` Defines the capitalization of text. (none, capitalize, uppercase, lowercase)
- `text-indent: 50px;` Defines the indentation of the first line in a text-block.

## Fonts

- `font-family: "Times New Roman", Times, serif;` Defines the font family for text.
- `font-size: 20px;` Defines the font size of text.
- `font-style: italic;` Defines the font style for text. (normal, italic, oblique)
- `font-variant: small-caps;` Defines whether or not a text should be displayed in a small-caps font. (normal, small-caps)
- `font-weight: bold;` Defines the weight of a font. (normal, bold, bolder, lighter, 100, 200, 300, 400, 500, 600, 700, 800, 900)
- `font: italic bold 12px arial, sans-serif;` A shorthand property for the above font properties.
