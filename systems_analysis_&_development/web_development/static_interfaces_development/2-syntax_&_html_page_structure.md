# Syntax & HTML page structure

## Index

- [Syntax \& HTML page structure](#syntax--html-page-structure)
  - [Index](#index)
  - [Considerations](#considerations)
  - [Basic structure](#basic-structure)

## Considerations

- HTML is a markup language, not a programming language.
- HTML is not case sensitive.
- Some HTML tags have optional closing tags.

## Basic structure

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Page title</title>
  </head>
  <body>
    <h1>Heading 1</h1>
    <p>Paragraph</p>
  </body>
  <!-- comment -->
</html>
~~~

> - **`<!DOCTYPE html>`:** Declares that this document is an HTML5 document.
> - **`lang`:** Specifies the language of the document. Important for accessibility, performance and SEO.
> - **`charset="utf-8"`:** Specifies the character encoding for the HTML document. Important for displaying special characters correctly.
> - **`<title>`:** Title is shown in the page's tab. Also used when you mark a page as a favorite and for SEO.
> - **`<head>`:** Contains info about the document, not displayed.
> - **`<body>`:** Contains the visible page content.
> - **`<h1>`:** Heading 1. There are 6 heading levels, `<h1>` is the most important and `<h6>` is the least important.
> - **`<p>`:** Paragraph.
> - **`<!-- comment -->`:** Comments are notes only visible in the source code.
