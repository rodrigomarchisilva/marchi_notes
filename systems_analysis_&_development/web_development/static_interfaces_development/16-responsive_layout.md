# Responsive Layout

## Index

- [Responsive Layout](#responsive-layout)
  - [Index](#index)
  - [Viewport](#viewport)
    - [Viewport usage](#viewport-usage)
  - [Working with grid view](#working-with-grid-view)
  - [Creating the CSS of a grid view](#creating-the-css-of-a-grid-view)
    - [box-sizing](#box-sizing)
  - [Working with images](#working-with-images)
    - [img](#img)
  - [Working with videos](#working-with-videos)
  - [Working with conditionals](#working-with-conditionals)
    - [@media](#media)
  - [Frameworks / Libraries](#frameworks--libraries)
  - [Templates](#templates)
  - [HTML Validators](#html-validators)

## Viewport

- It is the visible area of a web page in a browser window.

### Viewport usage

- You can adjust it to a fixed width.

~~~html
<meta name="viewport" content="width=320">
~~~

- You can adjust it to the current device width.

~~~html
<meta name="viewport" content="width=device-width">
~~~

- To make sure that the page will start without zooming in or out.

~~~html
<meta name="viewport" content="initial-scale=1.0">
~~~

- `maximum-scale` and `minimum-scale` can be used to limit the zooming.

~~~html
<meta name="viewport" content="maximum-scale=1.0, minimum-scale=1.0">
~~~

> **Note:** In this case, make sure the content is visible on the screen and does need to be zoomed in or out.

- Everything can be combined.

~~~html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
~~~

## Working with grid view

- Grid view is a way to display content in a grid.

~~~html
<div class="grid0" style="opacity:0.2;">
  <div class="grid1" style="height:500px;">
    <div class="grid2" style="background-color:#ccc;border-right:1px solid #000000;border-left:1px solid #000000;"></div>
    <div class="grid2" style="background-color:#ccc;border-right:1px solid #000000;"></div>
    <div class="grid2" style="background-color:#ccc;border-right:1px solid #000000;"></div>
    <div class="grid2" style="background-color:#ccc;border-right:1px solid #000000;"></div>
    <div class="grid2" style="background-color:#ccc;border-right:1px solid #000000;"></div>
    <div class="grid2" style="background-color:#ccc;border-right:1px solid #000000;"></div>
    <div class="grid2" style="background-color:#ccc;border-right:1px solid #000000;"></div>
    <div class="grid2" style="background-color:#ccc;border-right:1px solid #000000;"></div>
    <div class="grid2" style="background-color:#ccc;border-right:1px solid #000000;"></div>
    <div class="grid2" style="background-color:#ccc;border-right:1px solid #000000;"></div>
    <div class="grid2" style="background-color:#ccc;border-right:1px solid #000000;"></div>
    <div class="grid2" style="background-color:#ccc;border-right:1px solid #000000;"></div>
  </div>
</div>
~~~

~~~css
* {
  box-sizing:border-box;
}
.grid1 {
  overflow:auto;
  position:relative;
}
.grid2 {
  width:8.33%;
  margin:0;
  border-right:1px solid grey;
  height:100%;
  float:left;
}
~~~

- It then will make it easier to design the layout.

~~~html
<div style="position:absolute;opacity:0.9;width:auto;left:8px;right:10px;"><!--beginning of main div with the layout -->
  <div class="layout"><!--beginning of layout --> 
  
    <div class="organize" style="height:120px;"><!-- beginning of top -->
      <div class="grid" style="width:100%;background:#0F0;border-right-color:transparent;"></div>
    </div><!-- end of top -->
  
    <div class="organize" style="height:330px;"><!-- beginning of center -->
      <div class="grid" style="background-color:#000;border:none;width:25%;padding-top:15px;"><!-- beginning of left black div containing yellow divs -->
        <div style="background-color:#FF0;border:none;width:100%;height:10%;margin-bottom:10px;"></div><!-- left yellow div -->
        <div style="background-color:#FF0;border:none;width:100%;height:10%;margin-bottom:10px;"></div><!-- left yellow div -->
        <div style="background-color:#FF0;border:none;width:100%;height:10%;margin-bottom:10px;"></div><!-- left yellow div -->
        <div style="background-color:#FF0;border:none;width:100%;height:10%;margin-bottom:10px;"></div><!-- left yellow div -->
        <div style="background-color:#FF0;border:none;width:100%;height:10%;margin-bottom:10px;"></div><!-- left yellow div -->
        <div style="background-color:#FF0;border:none;width:100%;height:10%;margin-bottom:10px;"></div><!-- left yellow div -->
        <div style="background-color:#FF0;border:none;width:100%;height:10%;"></div><!-- left yellow div -->
      </div><!-- beginning of left black div containing yellow divs -->
      <div class="grid" style="background-color:#F00;border:none;"></div><!-- middle red div -->
      <div class="grid" style="background-color:#F00;border:none;"></div><!-- middle red div -->
      <div class="grid" style="background-color:#F00;border:none;"></div><!-- middle red div -->
      <div class="grid" style="background-color:#F00;border:none;"></div><!-- middle red div -->
      <div class="grid" style="background-color:#F00;border:none;"></div><!-- middle red div -->
      <div class="grid" style="background-color:#F00;border:none;"></div><!-- middle red div -->
      <div class="grid" style="background-color:#000;border:none;width:25%;padding-top:15px;"><!-- beginning of right black div containing the blue div -->
        <div style="background-color:#00F;border:none;width:100%;height:90%;"></div><!-- right blue div -->
      </div><!-- end of right black div containing the blue div-->
    </div><!-- end of center -->
  
    <div class="organize" style="height:50px;"><!-- beginning of footer -->
      <div class="grid" style="width:100%;background:#C0C;border-right-color:transparent;"></div><!-- purple div -->
    </div><!-- end of footer -->

  </div><!-- end of layout --> 
</div><!-- end of main div with the layout -->

<div class="main_grid" style="opacity:0.1;"><!-- beginning of 12 main grids -->
  <div class="organize" style="height:500px;">
    <div class="grid" style="background-color:#fff;border-right:1px solid #000;border-left:1px solid #000;"></div>
    <div class="grid" style="background-color:#fff;border-right:1px solid #000;"></div>
    <div class="grid" style="background-color:#fff;border-right:1px solid #000;"></div>
    <div class="grid" style="background-color:#fff;border-right:1px solid #000;"></div>
    <div class="grid" style="background-color:#fff;border-right:1px solid #000;"></div>
    <div class="grid" style="background-color:#fff;border-right:1px solid #000;"></div>
    <div class="grid" style="background-color:#fff;border-right:1px solid #000;"></div>
    <div class="grid" style="background-color:#fff;border-right:1px solid #000;"></div>
    <div class="grid" style="background-color:#fff;border-right:1px solid #000;"></div>
    <div class="grid" style="background-color:#fff;border-right:1px solid #000;"></div>
    <div class="grid" style="background-color:#fff;border-right:1px solid #000;"></div>
    <div class="grid" style="background-color:#fff;border-right:1px solid #000;"></div>
  </div>
</div><!-- end of 12 main grids -->
~~~

~~~css
* {
  box-sizing:border-box;
}
.organize {
  overflow:auto;
  position:relative;
}
.grid {
  width:8.33%;
  margin:0;
  border-right:1px solid #666;
  height:100%;
  float:left;
}
~~~

## Creating the CSS of a grid view

### box-sizing

- It tells the browser that `padding` and `border` should not be included in the `width` of the element that has them.
- So if an element has `200px width`, `10px padding` and `1px border`, the total `width` of the element will be `200px + 10px + 1px = 211px`, but if we use `box-sizing: border-box`, the total `width` of the element will be `200px`, ignoring the `padding` and `border`.

~~~css
* {
  box-sizing:border-box;
}
~~~

> **Note:** `*` is a selector that selects all elements.

- Building something with `box-sizing: border-box`.

~~~html
<div class="top">
  <p>top</p>
</div>
<div class="left_menu">
  <p>left menu</p>
</div>
<div class="center">
  <p>center</p>
</div>
<div class="right_menu">
  <p>right menu</p>
</div>
<div class="footer">
  <p>footer</p>
</div>
~~~

~~~css
* {
  box-sizing: border-box;
}

.top {
  border: 1px solid #F00;
  background: #CCC;
  padding: 5px;
  height:50px;
}
.left_menu {
  width: 15%;
  height:400px;
  float: left;
  padding: 5px;
  border: 1px solid #00F;
}
.center{
  width: 70%;
  height:400px;
  float: left;
  padding: 5px;
  border: 1px solid #0F0;
}
.right_menu {
  width: 15%;
  height:400px;
  float: right;
  padding: 5px;
  border: 1px solid #00F;
}
.footer {
  height:50px;
  clear: both;
  border: 1px solid #F00;
  background: #FF0;
  padding: 5px;
}
~~~

## Working with images

### img

- It can be responsive to the width of the screen by using `max-width: 100%` and `height: auto`.

~~~css
img {
  max-width: 100%;
  height: auto;
}
~~~

- It al can be limited to its own size.

~~~css
img {
  max-width: 100%;
  height: auto;
}
~~~

## Working with videos

- It basically works the same way as images.

~~~css
video {
  max-width: 100%;
  height: auto;
}
~~~

## Working with conditionals

### @media

- **Example:** If the screen is less than `600px`, the `background-color` of the `body` will be `lightgrey`.

~~~css
@media only screen and (max-width: 700px) {
  body {
    background-color: #000;
  }
}
~~~

## Frameworks / Libraries

- [Bootstrap](https://getbootstrap.com/)
- [Material Framework](https://nt1m.github.io/material-framework/#introduction)
- [Materialize](https://materializecss.com/)
- [Semantic UI](https://semantic-ui.com/)
- [Foundation](https://foundation.zurb.com/)
- [Cascade Framework](https://www.cascadeframework.com/)
- [Baseguide](https://basegui.de/)
- [Concise CSS](https://concisecss.com/)

## Templates

- [Free CSS](http://www.free-css.com/template-categories/responsive)
- [Templated](https://templated.co/)
- [Dcrazed](https://dcrazed.com/free-responsive-html5-css3-templates/) (Not working when tried)
- [W3layouts](https://w3layouts.com/free-responsive-html5-css3-website-templates/)
- [OS Templates](https://www.os-templates.com/free-website-templates)

## HTML Validators

- [W3C Markup Validation Service](https://validator.w3.org/)
- [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)
- [W3C Unified Validator](https://validator.w3.org/unicorn/)
