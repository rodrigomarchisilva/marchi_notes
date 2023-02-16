# Enhancing layouts

## Index

- [Enhancing layouts](#enhancing-layouts)
  - [Index](#index)
  - [Usability principles](#usability-principles)
  - [New HTML5 semantic elements](#new-html5-semantic-elements)
    - [`<header>`](#header)
    - [`<nav>`](#nav)
    - [`<section>`](#section)
    - [`<article>`](#article)
    - [`<aside>`](#aside)
    - [`<footer>`](#footer)
    - [`<details>` \& `<summary>`](#details--summary)
  - [Formatting semantic elements](#formatting-semantic-elements)
  - [Templates](#templates)

## Usability principles

- `Easy to learn`: The website mus be easy for the user to learn and use.
- `Efficient`: Once the user learns how to use the website, it should reach a good productivity level.
- `Memorable`: The user should be able to remember how to use it after a some time without using it.
- `Safe`: The user should not be able to make mistakes that could cause problems, and if they do, the website should be able to recover from them easily.
- `Satisfying`: The user should feel good about using the website.

## New HTML5 semantic elements

### `<header>`

- Allows to define a header for a document or a section. It usually contains a logo, the name of the website, and a navigation bar.

~~~html
<header>
  <h1>My Website</h1>
  <nav>
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </nav>
</header>
~~~

### `<nav>`

- Allows to define a set of navigation links.

~~~html
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
~~~

### `<section>`

- Allows to define a section in a document. Can be used with `<header>` and `<article>`.

~~~html
<section>
  <header>
    <h2>Section 1</h2>
  </header>
  <article>
    <p>Some text...</p>
  </article>
  <footer>
    <p>More about...</p>
  </footer>
</section>
~~~

### `<article>`

- Allows to define an independent self-contained content, the main content of a page or layout.

~~~html
<article>
  <h1>Article 1</h1>
  <p>Some text...</p>
</article>
~~~

### `<aside>`

- Allows to define content aside from the content it is placed in (like a sidebar). Used for side menus, related articles, banners, etc.

~~~html
<aside>
  <h2>Related Articles</h2>
  <ul>
    <li><a href="article1.html">Article 1</a></li>
    <li><a href="article2.html">Article 2</a></li>
    <li><a href="article3.html">Article 3</a></li>
  </ul>
</aside>
~~~

### `<footer>`

- Allows to define a footer for a document or a section.

~~~html
<footer>
  <p>My Website &copy; 2019</p>
</footer>
~~~

### `<details>` & `<summary>`

- Allows to define additional details that the user can view or hide. Used for FAQs, help text, etc. Commonly used with `<summary>`, that allows to define a heading for the `<details>` element.

~~~html
<details>
  <summary>Click to view more details</summary>
  <p>Some text...</p>
</details>
~~~

## Formatting semantic elements

- They can be specifically styled using CSS.

~~~css
header{background-color: lightblue;}
nav{background-color: lightgreen;}
section{background-color: lightyellow;}
article{background-color: lightpink;}
aside{background-color: lightgray;}
footer{background-color: lightblue;}
details{color: blue;}
~~~

## Templates

- Ready to use website structure and style.
- [OS Templates](https://www.os-templates.com/)
