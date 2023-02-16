# Forms

## Index

- [Forms](#forms)
  - [Index](#index)
  - [Building HTML forms](#building-html-forms)
    - [form](#form)
  - [Naming form and its entries](#naming-form-and-its-entries)
  - [input element](#input-element)
    - [text](#text)
    - [password](#password)
    - [radio](#radio)
    - [checkbox](#checkbox)
    - [color](#color)
    - [date](#date)
    - [datetime-local](#datetime-local)
    - [email](#email)
    - [month](#month)
    - [number](#number)
    - [range](#range)
    - [search](#search)
    - [tel](#tel)
    - [time](#time)
    - [url](#url)
    - [week](#week)
    - [file](#file)
    - [button](#button)
    - [reset](#reset)
    - [submit](#submit)
    - [textarea](#textarea)
    - [select](#select)
    - [optgroup](#optgroup)
    - [datalist](#datalist)
    - [keygen (Deprecated)](#keygen-deprecated)
    - [output](#output)
    - [fieldset](#fieldset)
  - [Sending form data to an email address](#sending-form-data-to-an-email-address)
  - [Forms validation with HTML5](#forms-validation-with-html5)
    - [required](#required)
    - [min, max and step](#min-max-and-step)
    - [pattern](#pattern)
    - [placeholder](#placeholder)
    - [multiple](#multiple)
  - [Formatting forms with CSS](#formatting-forms-with-css)

## Building HTML forms

### form

- The `<form>` element is used to create an HTML form.

~~~html
<form action="/action_page.php" method="get">
  First name:<br>
  <input type="text" name="firstName" value="Mickey">
  <br>
  Last name:<br>
  <input type="text" name="lastName" value="Mouse">
  <br><br>
  <input type="submit" value="Submit">
</form>
~~~

- The `action` attribute defines where (`URL`) to send the form-data when a form is submitted.
- The `method` attribute defines the HTTP method to use when sending form-data.
  - `GET` - It is the default method for forms. The `GET` method sends the form-data as query string parameters in the action URL. Capacity limited to 1024 characters. Used for a small amount of data, like a search or send information to another page through the `URL (Uniform Resource Locator)`.
  - `POST` - Sends the form-data as HTTP post transaction. There is no limit. Used for a large amount of data, like file upload, or sending confidential data like passwords. Uses `URI (Uniform Resource Identifier)`, that is not retrievable by the user, so it is more secure than `GET`.

## Naming form and its entries

- Every form must have a `name` attribute.
- It makes it easier to validate it and identify where the data is going to be sent.
- Every entry field must be named as well, otherwise the data will not be sent to the database.

~~~html
<form action="/action_page.php" method="get" name="myForm">
  First name:<br>
  <input type="text" name="firstName" value="Mickey">
  <br>
  Last name:<br>
  <input type="text" name="lastName" value="Mouse">
  <br><br>
  <input type="submit" value="Submit">
</form>
~~~

## input element

- Used to receive information and is self-closing.

~~~html
<input type="text" name="firstName" value="Mickey">
~~~

### text

- Used to receive a single line of text.
- Can be limited by using the `maxlength` attribute.

~~~html
<input type="text" name="firstName" value="Mickey" maxlength="10">
~~~

### password

- Used to receive a single line of text, but the characters are hidden.
- Can be limited by using the `maxlength` attribute as well.

~~~html
<input type="password" name="password" value="123456" maxlength="10">
~~~

### radio

- Used to receive a single selection from a group of options.
- The `name` attribute must be the same for all the options.
- Once one option is selected, the others are automatically deselected.

~~~html
<input type="radio" name="car" value="volvo"> Volvo<br>
<input type="radio" name="car" value="saab"> Saab<br>
<input type="radio" name="car" value="fiat"> Fiat<br>
<input type="radio" name="car" value="audi" checked> Audi
~~~

> **Note:** The `checked` attribute is used to specify that an option should be pre-selected when the page loads.

### checkbox

- Used to receive multiple selections from a group of options.
- The `name` attribute will be different for each option.
- `value` is optional, because if it is not specified, the value will be `on`.

~~~html
<input type="checkbox" name="vehicle1" value="Bike"> I have a bike<br>
<input type="checkbox" name="vehicle2" value="Car"> I have a car
~~~

### color

~~~html
<input type="color" name="favcolor" value="#ff0000">
~~~

### date

- You can add `min` and `max` attributes to specify the minimum and maximum date.

~~~html
<input type="date" name="bday" min="2018-01-01" max="2018-12-31">
~~~

### datetime-local

~~~html
<input type="datetime-local" name="meeting-time" value="2018-06-12T19:30">
~~~

### email

~~~html
<input type="email" name="email">
~~~

### month

- You can select the month and year.

~~~html
<input type="month" name="bdaymonth">
~~~

### number

- You can add `min` and `max` attributes to specify the minimum and maximum number.

~~~html
<input type="number" name="quantity" min="1" max="5">
~~~

### range

- You can add `min` and `max` and `step` attributes to specify the minimum and maximum number and the step.

~~~html
<input type="range" name="points" min="1" max="10" step="1">
~~~

### search

- Used to receive a single line of text, but with the difference that it has a search icon on the right side and you can click on the `x` to clear the text.

~~~html
<input type="search" name="search">
~~~

### tel

- Used to receive a telephone number.
- Not supported before Safari 8.

~~~html
<input type="tel" name="phone">
~~~

### time

- Time selection without timezone.

~~~html
<input type="time" name="appt" min="09:00" max="18:00" required>
~~~

### url

- Some browsers will validate the URL automatically.

~~~html
<input type="url" name="homepage">
~~~

### week

- You can select the week and year.

~~~html
<input type="week" name="week">
~~~

### file

~~~html
<input type="file" name="pic" accept="image/*">
~~~

### button

- Used to create a null button, without action.
- Value determines its name.

~~~html
<input type="button" value="Click Me!">
~~~

### reset

- Used to reset all the form fields to their initial values.
- Value determines its name.

~~~html
<input type="reset" value="Reset">
~~~

### submit

- Used to submit the form to the server.
- Value determines its name.

~~~html
<input type="submit" value="Submit">
~~~

### textarea

- Used to receive a multiple lines of text.
- The `rows` attribute specifies the visible number of lines in a text area.
- The `cols` attribute specifies the visible width of a text area.
- If the typed text is longer than the size of the text area, a scroll-bar will appear.
- Its standard value must be inserted between the opening and closing tags.

~~~html
<textarea name="message" rows="10" cols="30">
  The cat was playing in the garden.
</textarea>
~~~

### select

- Used to create a drop-down list.
- To create the options, you must use the `option` element.
- Options can be previously selected by using the `selected` attribute.

~~~html
<select name="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="fiat">Fiat</option>
  <option value="audi" selected>Audi</option>
</select>
~~~

### optgroup

- Used to group related options in a drop-down list.

~~~html
<select name="cars">
  <optgroup label="Swedish Cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
  </optgroup>
  <optgroup label="German Cars">
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </optgroup>
</select>
~~~

### datalist

- Used to provide a predefined list of values for an input element.
- The `list` attribute of the `input` element, must refer to the `id` attribute of the `datalist` element.
- A drop-down list will appear when the user starts to type in the input field.

~~~html
<input list="browsers" name="browser">
  <datalist id="browsers">
    <option value="Internet Explorer">
    <option value="Firefox">
    <option value="Chrome">
    <option value="Opera">
    <option value="Safari">
  </datalist>
~~~

### keygen (Deprecated)

- Used to generate a public/private key pair.
- The public key is stored in the server, and the private key is stored locally.
- With the public key, you can generate, as an example, a digital signature to authenticate the user in the future.

~~~html
<form action="/action_page.php">
  <label for="usrname">Username</label>
  <input type="text" id="usrname" name="usrname">
  <label for="psw">Password</label>
  <input type="password" id="psw" name="psw">
  <label for="key">Key</label>
  <keygen name="security" id="key">
  <input type="submit">
</form>
~~~

### output

- Used to display the result of a calculation, or the result of a user action.
- To work, it needs a `JavaScript` information in the `<form>` element, and the usage of the inputs `range` and `number`.

~~~html
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">
  <input type="range" id="a" value="50"> +
  <input type="number" id="b" value="50">
  <output name="x" for="a b"></output>
</form>
~~~

### fieldset

- Used to group related elements in a form.
- The `legend` element defines a caption for the `fieldset` element.

~~~html
<form action="/action_page.php">
  <fieldset>
    <legend>Personalia:</legend>
    Name: <input type="text"><br>
    E-mail: <input type="text"><br>
    Date of birth: <input type="text">
  </fieldset>
  <fieldset>
    <legend>Payment Information:</legend>
    Name on Card: <input type="text"><br>
    Credit card number: <input type="text"><br>
    Expiration date: <input type="text">
  </fieldset>
  <input type="submit" value="Submit">
</form>
~~~

## Sending form data to an email address

- You can send form data to an email address by using the `action` attribute of the `form` element.
- You must also indicate the data will be sent as a text sheet by using the attribute `enctype="text/plain"`.

> **Note:** To work properly, Outlook or another email client must be installed on the computer.

~~~html
<form action="mailto:myemail@gmail.com" method="post" name="my_form" enctype="text/plain">
  Name:<br>
  <input type="text" name="name"><br>
  E-mail:<br>
  <input type="text" name="mail"><br>
  Comment:<br>
  <input type="text" name="comment" size="50"><br><br>
  <input type="submit" value="Send">
  <input type="reset" value="Reset">
</form>
~~~

## Forms validation with HTML5

- Can happen client-side or server-side.
- On client-side, you can use `JavaScript` or `HTML5`.
- `HTML5` has better performance, but it is less customizable.

### required

- Used to specify that an input field must be filled out before submitting the form.

~~~html
<input type="text" name="firstname" required>
~~~

### min, max and step

- Used to specify the minimum, maximum and step values for an input field.

~~~html
<input type="number" name="quantity" min="1" max="5" step="1">
~~~

### pattern

- Used to specify a regular expression that an input field's value is checked against.

~~~html
<input type="text" name="text" required pattern="[a-z\s]+$" /> <!-- Only letters and spaces -->
<input type="text" name="numbers" required  pattern="[0-9]+$" /> <!-- Only numbers -->
<input type="date"  name="date" maxlength="10"  required  pattern="[0-9]{2}\/[0-9]{2}\/[0-9]{4}$" min="2010-01-01" max="2016-01-01" /> <!-- Date format dd/mm/yyyy -->
<input type="time"  maxlength="8" name="time" required pattern="[0-9]{2}:[0-9]{2} [0-9]{2}$" /> <!-- Time format hh:mm:ss -->
<input type="tel"  maxlength="15" name="phone"  required pattern="\([0-9]{2}\) [0-9]{4,6}-[0-9]{3,4}$" /> <!-- Phone format (xx) xxxx-xxxx -->
<input type="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" /> <!-- Email format -->
~~~

### placeholder

- Used to specify a short hint that describes the expected value of an input field.

~~~html
<input type="text" name="firstname" placeholder="First name">
~~~

### multiple

- Used to specify that a user can enter more than one value in an input field.
- Usually used with `type="email"` or `type="file"`.

~~~html
<input type="email" name="email" multiple>
~~~

## Formatting forms with CSS

- You can use the `:valid` and `:invalid` pseudo-classes to style the form elements.
- You can use the `:required` pseudo-class to style the required form elements.
- You can use the `:optional` pseudo-class to style the optional form elements.

~~~css
input:valid {
  background-color: #66ff66;
}

input:invalid {
  background-color: #ff6666;
}

input:required {
  background-color: #ff6666;
}

input:optional {
  background-color: #66ff66;
}

input:required:valid {
  background-color: #66ff66;
}
~~~
