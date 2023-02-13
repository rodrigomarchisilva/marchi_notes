# HTML

## Index

- [HTML](#html)
  - [Index](#index)
  - [Places to learn CSS](#places-to-learn-css)
  - [Concepts](#concepts)
  - [Structure](#structure)
  - [Tags](#tags)
    - [p (paragraph)](#p-paragraph)
    - [h1, h2, h3, h4, h5, h6 (headings)](#h1-h2-h3-h4-h5-h6-headings)
    - [img (image)](#img-image)
    - [a (anchor for links)](#a-anchor-for-links)
    - [hr (horizontal rule)](#hr-horizontal-rule)
  - [Browser](#browser)
  - [Attributes](#attributes)
    - [a](#a)
    - [img](#img)
  - [List types](#list-types)
    - [Ordered list (ol)](#ordered-list-ol)
    - [Unordered list (ul)](#unordered-list-ul)
    - [Description list (dl)](#description-list-dl)

## Places to learn CSS

- [W3C](https://www.w3.org/Style/CSS/Overview.en.html) Organization that develops web standards.
- [W3Schools](https://www.w3schools.com/css/) Online web tutorials.
- [Markup Validation Service](https://validator.w3.org/) Validates HTML and CSS.

## Concepts

- HTML stands for `HyperText Markup Language`.
- It is the standard markup language for creating web pages and web applications.
- HTML isn't a programming language. It is a markup language.
- The extension for HTML files is `.html`.

## Structure

~~~html
<!DOCTYPE html> <!-- This is the declaration for HTML5. It has to be the first line of the document. -->

<html lang="en"> <!-- This is the root element of the document. -->

  <head> <!-- This is where information about the document is stored. -->
    <meta charset="UTF-8"> <!-- This is the character encoding for the document. -->
    <title>Page Title</title> <!-- This is the title of the page. -->
  </head>

  <body> <!-- This is where the content of the document is stored. -->
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
  </body>

</html>
~~~

## Tags

- Tags are divided into opening tags and closing tags.
- There are also self-closing tags such as `<img />` and `<br />`.

### p (paragraph)

~~~html
<p>This is a paragraph.</p>
~~~

### h1, h2, h3, h4, h5, h6 (headings)

~~~html
<h1>This is a heading.</h1>
~~~

### img (image)

~~~html
<img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com" width="104" height="142">
~~~

### a (anchor for links)

~~~html
<a href="https://www.w3schools.com">This is a link</a>
~~~

### hr (horizontal rule)

~~~html
<hr> <!-- This renders a horizontal line. -->
~~~

## Browser

- The browser reads the HTML document and renders it into a web page.

## Attributes

Attributes provide additional information about HTML elements.

### a

- `href` - Specifies the URL of the page the link goes to.
- `target` - Specifies where to open the linked document.
  - `_blank` - Opens the linked document in a new window or tab.
  - `_self` - Opens the linked document in the same frame as it was clicked (this is default).
  - `_parent` - Opens the linked document in the parent frame.
  - `_top` - Opens the linked document in the full body of the window.
  - `framename` - Opens the linked document in a named frame.

### img

- `src` - Specifies the path to the image.
- `alt` - Specifies an alternate text for the image, if the image cannot be displayed.
- `width` - Specifies the width of the image.
- `height` - Specifies the height of the image.

## List types

### Ordered list (ol)

A list marked with numbers.

~~~html
<ol>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol>
~~~

### Unordered list (ul)

A list marked with bullets.

~~~html
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
~~~

### Description list (dl)

A list with terms and their details.

~~~html
<dl>
  <dt>Coffee</dt> <!-- This is the term. -->
  <dd>- black hot drink</dd> <!-- This is the detail. -->
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
</dl>
~~~
