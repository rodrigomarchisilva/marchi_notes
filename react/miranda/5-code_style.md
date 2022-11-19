# Code style

## editorconfig

- Generate a `.editorconfig` file with the vscode extension [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).
- Change `trim_trailing_whitespace` and `insert_final_newline` to `true`:

~~~ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = crlf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
~~~
