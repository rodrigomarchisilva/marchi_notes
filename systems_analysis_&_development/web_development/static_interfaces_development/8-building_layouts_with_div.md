# Building layouts with div

## Index

- [Building layouts with div](#building-layouts-with-div)
  - [Index](#index)
  - [The tag div](#the-tag-div)
  - [Using float with div](#using-float-with-div)
  - [Creating a layout with div](#creating-a-layout-with-div)
    - [Building layouts with div and position](#building-layouts-with-div-and-position)

## The tag div

- Used to create a division or a section in an HTML document.
- It is a block element, which means that it will always start on a new line and take up the full width available (except when we use CSS to change its default behavior).
- It is a generic container for other HTML elements and does not represent anything on its own.

~~~html
<div>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</div>
~~~

## Using float with div

- It can float to the left or to the right.

~~~html
<div style="float: left">Left</div>
<div style="float: right">Right</div>
~~~

## Creating a layout with div

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title> layout float  div</title>
    <style>
        body {
          background: #FFF;
        }
        #general {
          width: 100%; 
          height: 700px;
          background: #fff;
        }
        #header {
          width: 100%;
          height:20%;
          background: #0F0;
        }
        #sidebar {
          float: left;
          width: 20%;
          height: 60%;
          background: #CCC;
        }
        #center {
          float: left;
          width: 80%;
          height: 60%;
          background: #00F;
        }
        #footer {
          width: 100%;
          height: 20%;
          background: #FF0;
          clear: both; /*with this property, we clear both sides of the element*/
        }
    </style>
  </head>
  <body>

  <div id="general">
    <div id="header">this is the header div</div>
    <div id="sidebar">this  is the side bar div</div>
    <div id="center">this is the center div</div>
    <div id="footer">this is the footer div</div>
  </div>

  </body>
</html>
~~~

### Building layouts with div and position

- `position: absolute` is used to position an element in relation to its closest positioned ancestor (instead of positioned relative to the viewport, like fixed). However, if an absolute positioned element has no positioned ancestors, it uses the document body, and moves along with page scrolling.

~~~css
div.relative {
  position: relative;
  width: 400px;
  height: 200px;
  border: 2px solid black;
}

div.absolute {
  position: absolute;
  top: 80px;
  right: 0;
  width: 200px;
  height: 100px;
  border: 2px solid black;
}
~~~

> **Note:** Absolute positioned elements are removed from the normal flow, and can overlap elements.

- `position: relative` is used to position an element in relation to its normal position. Setting the top, right, bottom, and left properties of a relatively-positioned element will cause it to be adjusted away from its normal position. Other content will not be adjusted to fit into any gap left by the element.

~~~css
div.relative {
  position: relative;
  left: 30px;
  border: 2px solid black;
}
~~~

- `position: static` - static positioned elements are not affected by the top, bottom, left, and right properties.

~~~css
div.static {
  position: static;
  border: 2px solid black;
}
~~~

- `position: fixed` is used to position an element in relation to the viewport, which means it always stays in the same place even if the page is scrolled. The top, right, bottom, and left properties are used to position the element.

~~~css
div.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  border: 2px solid black;
}
~~~

- `position: sticky` is used to position an element based on the user's scroll position. A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (like position:fixed).

~~~css
div.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  border: 2px solid black;
  background-color: lightgrey;
}
~~~
