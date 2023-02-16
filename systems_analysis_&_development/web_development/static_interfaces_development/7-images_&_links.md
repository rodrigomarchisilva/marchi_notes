# Images & Links

## Index

- [Images \& Links](#images--links)
  - [Index](#index)
  - [Images](#images)
    - [Extensions](#extensions)
      - [JPEG](#jpeg)
      - [PNG](#png)
      - [GIF](#gif)
    - [Formatting Images with CSS](#formatting-images-with-css)
    - [Tags figure \& figcaption](#tags-figure--figcaption)
    - [Display property](#display-property)
    - [Formatting figure element](#formatting-figure-element)
  - [Hyperlinks](#hyperlinks)
    - [Local Links](#local-links)
    - [External Links](#external-links)
    - [Creating titles for links](#creating-titles-for-links)
    - [Link target](#link-target)
    - [Links for downloading files](#links-for-downloading-files)
    - [Formatting hyperlinks with CSS](#formatting-hyperlinks-with-css)

## Images

- The tag used is `<img>`, which means image and is self-closing.
- The `src` attribute is used to specify the path to the image.
- The `alt` attribute is used to specify an alternative text for the image, in case it can't be loaded. Pretty important for accessibility.
- The `title` attribute is used to specify a tooltip for the image.

~~~html
<img src="path/to/image.png" alt="Alternative text" title="Tooltip text">
~~~

### Extensions

#### JPEG

- `.jpg`
- `.jpeg`

It's a lossy format, which means that it compresses the image, but it also loses some quality, bringing the file size down, thus making it faster to load and improving the website performance. Usually, its resolution is enough for web images.

#### PNG

- `.png`

It's a lossless format, which means that it doesn't lose any quality when compressing the image. It's also a good format for images with transparency. Better used when you want a good quality image.

#### GIF

- `.gif`

Only recommended for animations.

### Formatting Images with CSS

- You can use CSS to format the images, like changing the `border`, `width` and `height`.
- You can also use CSS to make the image responsive, so it adapts to the screen size.

~~~css
img {
  border: 1px solid black;
  width: 100px;
  height: 100px;
}

img.responsive {
  width: 100%;
  height: auto;
}
~~~

### Tags figure & figcaption

- The `<figure>` tag is used to group images and their captions.
- The `<figcaption>` tag is used to specify the caption for the image.

~~~html
<figure>
  <img src="path/to/image.png" alt="Alternative text" title="Tooltip text">
  <figcaption>Caption</figcaption>
</figure>
~~~

### Display property

- The `display` property is used to specify the display behavior of an element.
- The default value is `inline`, which means that the element will only take the space that it needs.
- The `block` value means that it will take the whole width of the container.
- The `inline-block` value will make the it behave as an inline element, but it will allow you to set the `width` and `height` properties.
- The `list-item` value will make the element behave as a list item, which means that it will have a bullet point.
- The `none` value will make the element invisible.
- The `initial` value will reset the property to its default value.

~~~css
img {
  display: block;
}
~~~

### Formatting figure element

~~~css
figure {
  display: block;
  width: 100%;
  text-align: center;
}

figcaption {
  font-style: italic;
}
~~~

> **Note:** Note that the changes made to the `figure` element will not affect the `figcaption` element.

## Hyperlinks

- The tag used is `<a>`, which means anchor.
- The `href` attribute is used to specify the path to the link, and means hypertext reference.

### Local Links

~~~html
<a href="path/to/file.html">Link text</a>
~~~

### External Links

~~~html
<a href="https://www.google.com">Link text</a>
~~~

### Creating titles for links

- You can create titles for links, which will appear when you hover over the link.

~~~html
<a href="path/to/file.html" title="Title text">Link text</a>
~~~

### Link target

- You can specify the target of the link, which means where the link will open.
- The default value is `_self`, which means that the link will open in the same window.
- The `_blank` value means that the link will open in a new window.
- The `_parent` value means that the link will open in the parent frame.
- The `_top` value means that the link will open in the full body of the window.

~~~html
<a href="path/to/file.html" target="_blank">Link text</a>
~~~

### Links for downloading files

Usually, when extension is `.html`, `.htm` or `.php`, the browser will try to open the file instead of downloading it. To force the browser to download the file, you can use the `download` attribute.

~~~html
<a href="path/to/file.pdf" download>Link text</a>
~~~

### Formatting hyperlinks with CSS

- `a:link` is used to style links that haven't been visited yet.
- `a:visited` is used to style links that have been visited.
- `a:hover` is used to style links when the mouse is over them.
- `a:active` is used to style links when they are being clicked.

~~~css
a:link {
  color: #FF0;
  background-color: #000;
  text-decoration: none;
}

a:visited {
  color: #F0F;
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  color: #F00;
  background-color: transparent;
  text-decoration: underline;
}

a:active {
  color: #0F0;
  background-color: transparent;
  text-decoration: underline;
}
~~~
