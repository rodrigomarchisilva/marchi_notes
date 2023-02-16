<!-- markdownlint-disable MD029 -->
# Menus

## Index

- [Menus](#menus)
  - [Index](#index)

## Creating lists on HTML

### Ordered and unordered lists

- Has numbers to identify the items.

~~~html
<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>
~~~

- Has bullets to identify the items.

~~~html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
~~~

### Interleaved lists

- You can create a list with both ordered and unordered lists.

~~~html
<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
  <ul>
    <li>First subitem</li>
    <li>Second subitem</li>
    <li>Third subitem</li>
  </ul>
</ol>
~~~

## Formatting lists in CSS

### Unordered lists

- You can change the style of the bullets.

~~~css
ul {list-style-type: circle;}
ul  {list-style-type: disc;}
ul {list-style-type: square;}
ul {list-style-type: none;}
~~~

### Ordered lists

- You can change the style of the numbers.

~~~css
ol {list-style-type: armenian;}
ol {list-style-type: cjk-ideographic;}
ol {list-style-type: decimal;}
ol {list-style-type: decimal-leading-zero;}
ol {list-style-type: georgian;}
ol {list-style-type: hebrew;}
ol {list-style-type: hiragana;}
ol {list-style-type: hiragana-iroha;}
ol {list-style-type: katakana;}
ol {list-style-type: katakana-iroha;}
ol {list-style-type: lower-alpha;}
ol {list-style-type: lower-greek;}
ol {list-style-type: lower-latin;}
ol {list-style-type: lower-roman;}
ol {list-style-type: upper-alpha;}
ol {list-style-type: upper-greek;}
ol {list-style-type: upper-latin;}
ol {list-style-type: upper-roman;}
ol {list-style-type: none;}
ol {list-style-type: inherit;}
~~~

### list-style-image

- You can change the style of the bullets with an image.

~~~css
ul {
  list-style-image: url("image.png");
}
~~~

### list-style-position

- You can change the position of the bullets.

~~~css
ul {
    list-style-position: inside;
}
ul {
    list-style-position: outside; /*default*/
}
~~~

### list-style shorthand

- You can change the style of the list indicators with a shorthand.

~~~css
ul {
  list-style: square inside url("marker.gif");
}
~~~

### Creating lists with colors

- You can change the color of the whole list at once, or the color of each item individually.

~~~css
ul {
  color: red;
}

ul li {
  color: blue;
}
~~~

### Changing color, type and size of a list

- As long as you remove your markers, you can change the color, type and size of your list.

~~~css
ul {
  list-style-type: none; /* remove the markers */
  padding: 0;
  margin: 0;
}

ol {
  list-style-type: none; /* remove the markers */
  padding: 20px;
  margin: 0;
}

li { 
  padding-left: 16px; 
}

li:before { /* formatting the marker*/
  content: "&"; /* choose desired marker */
  padding-right: 8px;
  color: blue; /* change its color */
  font-size:2em; /* change its size */
}
~~~

## Creating menus

### Creating a vertical menu

1. Create a list

~~~html
<ul>
  <li><a href="#">Home</a></li>
  <li><a href="#">About</a></li>
  <li><a href="#">Contact</a></li>
</ul>
~~~

2. Add the CSS

~~~css
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  border: 1px solid #555;
}

li {
  text-align: center;
  border-bottom: 1px solid #555;
}
~~~

3. Verticalize the links in the list

~~~css
li a {
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
  font-size: 1em;
}
~~~

4. Format on hover

~~~css
li a:hover {
  background-color: #555;
  color: white;
  font-size: 1.2em;
}
~~~

### Creating a horizontal menu

1. Add `overflow: hidden;` to the `ul` element. It says that the list should not be displayed outside the container. So it its size is bigger than the container, it will be hidden.

~~~css
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}
~~~

2. Add `float: left;` to the `li` elements.

~~~css
li {
  float: left;
}
~~~
