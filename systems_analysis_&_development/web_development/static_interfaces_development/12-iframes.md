# iFrames (inline frames)

- iFrames are used to embed other web pages into your own. They are similar to the `img` tag, but they are used to embed an entire web page. They are also similar to the `object` tag, but they are used to embed a single web page.

## Index

- [iFrames (inline frames)](#iframes-inline-frames)
  - [Index](#index)
  - [Syntax](#syntax)
  - [Formatting an iFrame](#formatting-an-iframe)
    - [width](#width)
    - [height](#height)
    - [frameborder](#frameborder)
    - [scrolling](#scrolling)
  - [Full Screen iFrame](#full-screen-iframe)
  - [Creating links for iFrames](#creating-links-for-iframes)
  - [Ensuring Safe iFrames](#ensuring-safe-iframes)
    - [sandbox](#sandbox)
    - [srcDoc](#srcdoc)
    - [seamless (Deprecated)](#seamless-deprecated)

## Syntax

~~~html
<iframe
  src="https://www.w3schools.com"
  title="W3Schools Free Online Web Tutorials"
>
</iframe>
~~~

> **Note:** Some websites do not allow their pages to be embedded in other web pages, like YouTube. To do it, you first have to click on the share button and then click on the embed button. Then you can copy the code and paste it in your web page (<https://www.youtube.com/embed/path_to_video> instead of <https://www.youtube.com/watch?v=path_to_video>).

## Formatting an iFrame

### width

~~~html
<iframe
  src="https://www.w3schools.com"
  title="W3Schools Free Online Web Tutorials"
  width="500"
>
</iframe>
~~~

### height

~~~html
<iframe
  src="https://www.w3schools.com"
  title="W3Schools Free Online Web Tutorials"
  height="500"
>
</iframe>
~~~

### frameborder

- Defines whether or not to display a border around the iFrame.
- `0` - No border
- `1` - Has border

~~~html
<iframe
  src="https://www.w3schools.com"
  title="W3Schools Free Online Web Tutorials"
  frameborder="0"
>
</iframe>
~~~

### scrolling

- Defines whether or not to display scroll bars.
- `yes` - Display scroll bars
- `no` - Do not display scroll bars
- `auto` - Display scroll bars only when needed

~~~html
<iframe
  src="https://www.w3schools.com"
  title="W3Schools Free Online Web Tutorials"
  scrolling="no"
>
</iframe>
~~~

> **Note:** Attribute `scrolling` is no longer supported in `HTML5`, so it is recommended to use `CSS` instead, with the `overflow: hidden` property. However, it is recommended to use both to make sure that it works on all browsers.

~~~html
<iframe
  src="https://www.w3schools.com"
  title="W3Schools Free Online Web Tutorials"
  scrolling="no"
  style="overflow: hidden"
>
</iframe>
~~~

## Full Screen iFrame

- The `allowfullscreen` attribute allows the user to view the iFrame in full screen mode.
- But it needs the method `requestFullscreen()` to be called on the iFrame element.

~~~html
<iframe
  src="https://www.w3schools.com"
  title="W3Schools Free Online Web Tutorials"
  allowfullscreen
  style="overflow: hidden"
>
</iframe>
~~~

~~~js
const iframe = document.querySelector('iframe');
iframe.requestFullscreen();
~~~

## Creating links for iFrames

- You have to name the iFrame with the `name` attribute, and then you can use the `target` attribute in the link to specify the name of the iFrame.

~~~html
<iframe
  src="https://www.w3schools.com"
  title="W3Schools Free Online Web Tutorials"
  name="w3schools"
  allowfullscreen
  style="overflow: hidden"
>
</iframe>

<a href="https://www.w3schools.com" target="w3schools">W3Schools</a>
~~~

## Ensuring Safe iFrames

- You can use the `sandbox` attribute to ensure that the iFrame is safe.

### sandbox

- `""` - Activate all restrictions.
- `allow-forms` - Allow the iFrame to submit forms.
- `allow-pointer-lock` - Allow the iFrame to use the Pointer Lock API.
- `allow-popups` - Allow the iFrame to open popups.
- `allow-same-origin` - Allow the iFrame to be treated as being from the same origin as the parent page.
- `allow-scripts` - Allow the iFrame to run scripts.
- `allow-top-navigation` - Allow the iFrame to navigate the top-level browsing context.

~~~html
<iframe
  src="https://www.w3schools.com"
  title="W3Schools Free Online Web Tutorials"
  name="w3schools"
  allowfullscreen
  style="overflow: hidden"
  sandbox
>
</iframe>
~~~

### srcDoc

- The `srcDoc` attribute allows you to specify the content of the frame directly in the attribute, rather than referencing an external file or URL.
- Not all browsers support the `srcDoc` attribute.
- Recommended to be used with `sandbox` attribute.
- Recommended to be used with `seamless` attribute before it was deprecated.
- Use cases include:
  - Embedding self-contained content: If you have a standalone HTML form, calculator, or other self-contained content that you want to embed within another webpage, you can use `srcDoc` to include the content directly in the parent page without the need for a separate file or URL.
  - Displaying dynamic or user-generated content: If you want to display content that is generated dynamically or entered by the user, you can use `srcDoc` to include the content in an `<iframe>` on the page. This can be useful for web-based email clients, text editors, and other applications that allow users to create or edit content.
  - Creating interactive widgets or components: If you want to create a reusable widget or component that can be easily embedded on other sites, you can use `srcDoc` to include the necessary HTML, CSS, and JavaScript directly in the `<iframe>`. This can be a more flexible and portable approach than relying on external files or libraries.
  - Offline web applications: If you are building an offline web application that needs to run locally on a user's device, you can use `srcDoc` to include the necessary content and code in the application's HTML file. This can allow the application to function without an internet connection or external resources.

~~~html
<iframe
  srcDoc="<h1>W3Schools</h1>"
  title="W3Schools Free Online Web Tutorials"
  name="w3schools"
  allowfullscreen
  style="overflow: hidden"
  sandbox
>
</iframe>
~~~

### seamless (Deprecated)

- The `seamless` attribute specifies that the iFrame should be displayed without any border.
- It will behave and be read as if it is part of the containing document, not an external reference.
- To use it, you must be sure there is no harmful content in the iFrame, because of how it works.

~~~html
<iframe
  src="https://www.w3schools.com"
  title="W3Schools Free Online Web Tutorials"
  name="w3schools"
  allowfullscreen
  style="overflow: hidden"
  seamless
>
</iframe>
~~~
