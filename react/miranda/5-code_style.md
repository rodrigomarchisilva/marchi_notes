# Code style

## .editorconfig

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

> Note: `end_of_line` is set to `crlf` because I'm using Windows. If you're using Linux or Mac, change it to `lf`. This config carries over to Prettier, unless overridden.

## ESLint

~~~properties
npx eslint --init
~~~

- Select `To check syntax and find problems`;
- Select `JavaScript modules (import/export)`;
- Select `React`;
- Select `No` for TypeScript; (if you want to use TypeScript, select `Yes` and follow the instructions to install the dependencies);
- Press `a` to select node and browser, followed by `Enter`;
- Select `JavaScript` as configuration file format;
- Finally, select `Yes` to install dependencies and `npm` as package manager.

### eslintrc.js

- Create a file named `.eslintrc.json` in the root of the project and add the following content:

~~~json
module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
    // "plugin:@typescript-eslint/eslint-recommended",
    // "plugin:@typescript-eslint/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@babel/eslint-parser",
  // "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    // "@typescript-eslint",
    "react",
    "react-hooks",
    "prettier"
  ],
  "rules": {
    // "prettier/prettier": ["error", { "singleQuote": true }],
    "react/react-in-jsx-scope": "off"
  },
};
~~~

- Install eslint extension for vscode if not already installed.

## Prettier

- Use the following command to install the dependencies:

~~~properties
npm i -D prettier eslint-plugin-prettier eslint-config-prettier @babel/core @babel/eslint-plugin @babel/eslint-parser
~~~

- Create a file named `.prettierrc.json` in the root of the project and add the following content:

~~~json
{
  // "arrowParens": "always",
  // "bracketSpacing": true,
  // "htmlWhitespaceSensitivity": "ignore",
  // "insertPragma": false,
  // "jsxSingleQuote": false,
  // "proseWrap": "always",
  // "quoteProps": "as-needed",
  // "requirePragma": false,
  // "useTabs": false,
  // "vueIndentScriptAndStyle": false,
  // "embeddedLanguageFormatting": "off",
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
~~~

- Create a file name `.babelrc.json` in the root of the project and add the following content:

~~~json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
~~~

- Add the following script to run prettier formatting your code:

~~~json
"format": "prettier --write ."
~~~

- On VSCode settings, add the following if you want to format on save:

~~~json
// Format on save
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
  "source.fixAll": true
},
~~~
