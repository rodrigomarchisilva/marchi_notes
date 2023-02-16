<!-- markdownlint-disable MD024 -->
# Animations and Transitions

- In the past, `JavaScript` and `Flash` were used to create animations and transitions.
- With `CSS3`, we can now create animations and transitions without them.

## Index

- [Animations and Transitions](#animations-and-transitions)
  - [Index](#index)
  - [@keyframes CSS selector](#keyframes-css-selector)
    - [Syntax](#syntax)
    - [Example](#example)
    - [prefixes](#prefixes)
    - [Using percentages](#using-percentages)
    - [Delaying the animation](#delaying-the-animation)
    - [Defining the number of times the animation will run](#defining-the-number-of-times-the-animation-will-run)
    - [Defining the timing function of the animation](#defining-the-timing-function-of-the-animation)
    - [Defining the animation shorthand](#defining-the-animation-shorthand)
  - [Transitions](#transitions)
    - [Syntax](#syntax-1)
    - [Example](#example-1)
    - [Using other property values](#using-other-property-values)
    - [transition-timing-function](#transition-timing-function)
    - [transition-delay](#transition-delay)
    - [transition shorthand](#transition-shorthand)
  - [Transformations](#transformations)
    - [2D transform](#2d-transform)
    - [3D transform](#3d-transform)
    - [Creating transitions with transformations](#creating-transitions-with-transformations)
  - [Tools and Examples](#tools-and-examples)
    - [Tools for HTML5 animations](#tools-for-html5-animations)
    - [Examples](#examples)
    - [Edit directly on codepen](#edit-directly-on-codepen)

## @keyframes CSS selector

- The `@keyframes` CSS selector is used to define the animation.

### Syntax

~~~css
@keyframes animation-name {
  from { property: value; }
  to { property: value; }
}
~~~

### Example

- In this example, we will create a box that will change color from red to yellow after 5 seconds.

~~~html
<div
  class="box"
>
</div>

<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
    animation-name: my-animation;
    animation-duration: 5s;
  }

  @keyframes my-animation {
    from { background-color: red; }
    to { background-color: yellow; }
  }
</style>
~~~

### prefixes

- To make some css features work in all browsers, we need to add prefixes to it.
- `-webkit-` is the prefix for `Chrome` and `Safari`.
- `-moz-` is the prefix for `Firefox` from `Mozilla`.
- `-ms-` is the prefix for `Internet Explorer` from `Microsoft`.
- `-o-` is the prefix for `Opera`.

> **Note**: The prefixes are temporary until all browsers support the features.

### Using percentages

- We can also use percentages instead of `from` and `to`.

~~~css
@keyframes my-animation {
  0% { background-color: red; left: 0; top: 0; } /* 0% is the same as from */
  25% { background-color: blue; left: 200px; top: 0; }
  50% { background-color: green; left: 200px; top: 200px; }
  75% { background-color: orange; left: 0; top: 200px; }
  100% { background-color: yellow; left: 0; top: 0; } /* 100% is the same as to */
}

.box {
  width: 100px;
  height: 100px;
  background-color: red;
  position: relative;
  animation-name: my-animation;
  animation-duration: 5s;
}
~~~

### Delaying the animation

- We can delay the animation by adding the `animation-delay` property.

~~~css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  position: relative;
  animation-name: my-animation;
  animation-duration: 5s;
  animation-delay: 2s;
}
~~~

### Defining the number of times the animation will run

- We can define the number of times the animation will run by adding the `animation-iteration-count` property.
- You can use `infinite` to make the animation run forever, or a number to make it run a specific number of times.

~~~css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  position: relative;
  animation-name: my-animation;
  animation-duration: 5s;
  animation-delay: 2s;
  animation-iteration-count: infinite;
}

### Defining the direction of the animation

- We can define the direction of the animation by adding the `animation-direction` property.
- It can be `normal`, `reverse`, `alternate`, or `alternate-reverse`.

~~~css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  position: relative;
  animation-name: my-animation;
  animation-duration: 5s;
  animation-delay: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
~~~

### Defining the timing function of the animation

- We can define the timing function of the animation by adding the `animation-timing-function` property.
- `linear` - The animation will have the same speed from start to end.
- `ease` - The animation will start slowly, then speed up in the middle, and then slow down towards the end.
- `ease-in` - The animation will start slowly and then speed up towards the end.
- `ease-out` - The animation will start quickly and then slow down towards the end.
- `ease-in-out` - The animation will start slowly, speed up in the middle, and then slow down towards the end.
- `cubic-bezier(n,n,n,n)` - You can define your own values in a cubic-bezier function.

~~~css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  position: relative;
  animation-name: my-animation;
  animation-duration: 5s;
  animation-delay: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
}
~~~

### Defining the animation shorthand

- `animation: name duration timing-function delay iteration-count direction;`.

~~~css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  position: relative;
  animation: my-animation 5s ease-in-out 2s infinite alternate; /* animation shorthand */
}
~~~

## Transitions

- Transitions are used to change property values smoothly, over a given duration.
- Must specify two things:
  - The CSS property you want to add an effect to.
  - The duration of the effect.

### Syntax

~~~css
selector {
  property: value;
  transition-property: property;
  transition-duration: duration;
}
~~~

### Example

- In this example, we will create a box that will change color from red to yellow after 2 seconds.

~~~html
<div class="box"></div>
~~~

~~~css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  transition-property: background-color;
  transition-duration: 2s;
}

.box:hover {
  background-color: yellow;
}
~~~

### Using other property values

~~~css
div {
  width: 200px;
  height: 200px;
  background-color: lightgrey;
  transition: width 2s, height 4s;
  /* transition says that both properties will be changed, but in a different duration */
}
/* when the div is clicked (active), it will change the width and height */
div:active {
  width: 400px;
  height: 300px;
}
~~~

### transition-timing-function

- We can define the timing function of the transition by adding the `transition-timing-function` property, which works the same as the `animation-timing-function` property.

~~~css
div {
  width: 200px;
  height: 200px;
  background-color: lightgrey;
  transition: width 2s, height 4s;
  transition-timing-function: ease-in-out;
}
~~~

### transition-delay

- We can delay the transition by adding the `transition-delay` property, which works the same as the `animation-delay` property.

~~~css
div {
  width: 200px;
  height: 200px;
  background-color: lightgrey;
  transition: width 2s, height 4s;
  transition-timing-function: ease-in-out;
  transition-delay: 2s;
}
~~~

### transition shorthand

- `transition: property duration timing-function delay;`.

~~~css
div {
  width: 200px;
  height: 200px;
  background-color: lightgrey;
  transition: width 2s ease-in-out 2s, height 4s ease-in-out 2s;
}
~~~

## Transformations

- Transformations are used to change the appearance and position of an element.
- Transformations do not affect the position of other elements.
- Transformations are performed by modifying the coordinate space of the CSS visual formatting model.

### 2D transform

- `translateX(x)` - Moves an element from its current position along the x-axis.
- `translateY(y)` - Moves an element from its current position along the y-axis.
- `translate(x,y)` - Moves an element from its current position.
- `rotate(angle)` - Rotates an element around its origin.
- `scaleX(x)` - Increases or decreases the width of an element.
- `scaleY(y)` - Increases or decreases the height of an element.
- `scale(x,y)` - Increases or decreases the size of an element.
- `skewX(angle)` - Skews an element along the x-axis.
- `skewY(angle)` - Skews an element along the y-axis.
- `skew(x-angle,y-angle)` - Skews an element along the x-axis and/or the y-axis.
- `matrix(a,b,c,d,e,f)` - Defines a 2D transformation using a matrix of six values.

~~~css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  transform: translateX(100px);
}
~~~

### 3D transform

- `rotate3d(x,y,z,angle)` - Rotates an element around the x, y, and z axes (in 3D).
- `rotateX(angle)` - Rotates an element along the x-axis.
- `rotateY(angle)` - Rotates an element along the y-axis.
- `rotateZ(angle)` - Rotates an element along the z-axis.
- `scale3d(x,y,z)` - Increases or decreases the size of an element along the x, y, and z axes (in 3D).
- `scaleZ(z)` - Increases or decreases the size of an element along the z-axis.
- `translate3d(x,y,z)` - Moves an element along the x, y, and z axes (in 3D).
- `translateZ(z)` - Moves an element along the z-axis.
- `rotateZ(angle)` - Rotates an element along the z-axis.
- `matrix3d(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)` - Defines a 3D transformation using a matrix of sixteen values.

~~~css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  transform: rotate3d(1, 1, 1, 45deg);
}
~~~

### Creating transitions with transformations

- You must specify two things:
  - The transform value on transition property.
  - The property transform on the element.

~~~css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  transition: transform 2s;
}

.box:hover {
  transform: rotate(45deg);
}
~~~

## Tools and Examples

### Tools for HTML5 animations

- [Hippani](https://www.hippani.com/)
- [Google Web Designer](https://www.google.com/webdesigner/)
- [Animatron Studio](https://www.animatron.com/)
- [HTML5 Maker](http://html5maker.com/)
- [TweenJS](http://www.createjs.com/#!/TweenJS)
- [MotionComposer](https://www.aquafadas.com//motioncomposer/?lang=en)
- [Tumult Hype](http://tumult.com/hype/)
- [GSAP](https://greensock.com/gsap)
- [MuGeda](https://www.mugeda.com/index.php)
- [Radiapp](http://radiapp.com/)
- [Bly](http://bly.sk/#about)
- [NodeFire](http://www.nodefire.com/)
- [Modernizr](https://modernizr.com)

### Examples

- [Hover](https://ianlunn.github.io/Hover/)
- [All animations](http://all-animation.github.io/)
- [Animatable](http://leaverou.github.io/animatable/#text-indent)
- [CSS Effects](https://1stwebdesigner.com/css-effects/)

### Edit directly on codepen

- [CSS3 Animations](https://dcrazed.com/css3-animation-examples/)
- [Inspiring Examples](https://webdesign.tutsplus.com/pt/articles/15-inspiring-examples-of-css-animation-on-codepen--cms-23937)
