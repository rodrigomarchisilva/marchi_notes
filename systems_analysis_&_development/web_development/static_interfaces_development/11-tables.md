# Tables

## Table Structure

- `<table>` - table element
- `<tr>` - table row
- `<td>` - table data

~~~html
<table>
  <tr>
    <td>Cell 1</td>
    <td>Cell 2</td>
  </tr>
  <tr>
    <td>Cell 3</td>
    <td>Cell 4</td>
  </tr>
</table>
~~~

## Creating headers for tables

- `<th>` - table header

~~~html
<table>
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Cell 1</td>
    <td>Cell 2</td>
  </tr>
  <tr>
    <td>Cell 3</td>
    <td>Cell 4</td>
  </tr>
</table>
~~~

## Formatting a table with CSS

- To see clearly the table, we can add borders to it.

~~~css
table, th, td {
  border: 1px solid black;
}
~~~

### border-collapse

- `border-collapse: collapse;` - removes the space between the cells.
- `separate` - the default value. It adds a space between the cells.
- `collapse` - removes the space between the cells.

~~~css
table {
  border: 1px solid black;
  border-collapse: collapse;
}
~~~

### padding

- It adds space between the content and the borders of the table.

~~~css
th, td {
  border: 1px solid black;
  padding: 5px;
}
~~~

### text-align

- Defines the horizontal alignment of the text in a table cell.

~~~css
th, td {
  border: 1px solid black;
  padding: 5px;
  text-align: center;
}
~~~

### vertical-align

- Defines the vertical alignment of the text in a table cell.

~~~css
th, td {
  border: 1px solid black;
  padding: 5px;
  text-align: center;
  vertical-align: middle;
}
~~~

### border-spacing

- It adds space between the cells.

~~~css
table {
  border: 1px solid black;
  border-collapse: collapse;
  border-spacing: 15px 5px;
}
~~~

### background-color

- It defines the background color of the table.

~~~css
table {
  border: 1px solid black;
  border-collapse: collapse;
  background-color: #f1f1c1;
}
~~~

### width

- It defines the width of the table.

~~~css
table {
  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;
}
~~~

### height

- It defines the height of the table.

~~~css
table {
  border: 1px solid black;
  border-collapse: collapse;
  height: 100%;
}
~~~

## Creating captions for tables

- `<caption>` - table caption

~~~html
<table>
  <caption>Table 1: This is a table</caption>
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Cell 1</td>
    <td>Cell 2</td>
  </tr>
  <tr>
    <td>Cell 3</td>
    <td>Cell 4</td>
  </tr>
</table>
~~~

## Merge cells in a table

- `colspan` - specifies the number of columns a cell should span.
- `rowspan` - specifies the number of rows a cell should span.

~~~html
<table>
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Cell 1</td>
    <td>Cell 2</td>
  </tr>
  <tr>
    <td colspan="2">Cell 3</td>
  </tr>
</table>
~~~

## Formatting a column group

- `<colgroup>` - specifies a group of one or more columns in a table for formatting.

~~~html
<table>
  <colgroup>
    <col span="2" style="background-color:yellow">
  </colgroup>
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Cell 1</td>
    <td>Cell 2</td>
  </tr>
  <tr>
    <td>Cell 3</td>
    <td>Cell 4</td>
  </tr>
</table>
~~~

## thead, tbody, tfoot

- `<thead>` - groups the header content in a table.
- `<tbody>` - groups the body content in a table.
- `<tfoot>` - groups the footer content in a table.

~~~html
<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </tr>
    <tr>
      <td>Cell 3</td>
      <td>Cell 4</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Footer 1</td>
      <td>Footer 2</td>
    </tr>
  </tfoot>
</table>
~~~
