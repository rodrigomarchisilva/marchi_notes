# CSS syntax usage & selectors

## Index

- [CSS syntax usage \& selectors](#css-syntax-usage--selectors)
  - [Index](#index)
  - [Syntax](#syntax)
    - [Selector](#selector)
    - [Property](#property)
    - [Value](#value)
  - [Online editor](#online-editor)
  - [Types of usage](#types-of-usage)
    - [Inline](#inline)
    - [Internal](#internal)
    - [External](#external)
    - [Priotity](#priotity)
  - [Navigation between folders](#navigation-between-folders)
  - [Identifiers](#identifiers)
    - [id (#)](#id-)
    - [Class (.)](#class-)
  - [Combining selectors](#combining-selectors)
  - [Frameworks](#frameworks)

## Syntax

### Selector

Used to select the HTML element you want to style.

### Property

The property you want to change such as color, font, background, etc.

### Value

The value of the property you want to change such as red, 16px, etc.

## Online editor

- [CodePen](https://codepen.io/)

## Types of usage

### Inline

~~~html
<p style="color: red;">This is a red paragraph.</p>
~~~

### Internal

~~~html
<head>
  <style>
    p {
      color: red;
    }
  </style>
</head>
~~~

### External

~~~html
<head>
  <link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
~~~

- `rel` attribute specifies the **relationship** between the current document and the linked document.
- `type` attribute specifies the media type of the linked document.
- `href` **hypertext reference** attribute specifies the location of the linked document.

### Priotity

1. Inline
2. Internal
3. External

## Navigation between folders

- `../` - go to the parent folder
- `./` or no slash - stay in the same folder

## Identifiers

### id (#)

- It can't contain accents, spaces, or special characters.
- It must be unique within the HTML document.
- It is case sensitive.

~~~html
<h1 id="title">Title</h1>
~~~

~~~css
#title {
  color: red;
}
~~~

### Class (.)

- It can't contain accents, spaces, or special characters.
- It can be used multiple times within the HTML document.
- It is case sensitive.

~~~html
<h1 class="title">Title</h1>
~~~

~~~css
.title {
  color: red;
}
~~~

## Combining selectors

- `element.class` - selects all elements with the specified class
- `element#id` - selects all elements with the specified id
- `p#id element` - selects all elements inside a paragraph with the specified id
- `p, h1, h2` - selects all `<p>`, `<h1>`, and `<h2>` elements
- `.class1.class2` - selects all elements with both the specified classes

## Frameworks

They are a collection of generic code that can be used to build a website, saving time and effort.

- [Blueprint](http://blueprintcss.org/)
- [960 Grid System](http://960.gs/)
- [SenCSS](https://sencss.kilianvalkhof.com/)
