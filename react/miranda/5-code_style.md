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

## ESLint

~~~properties
npx eslint --init
~~~

- Select `To check syntax and find problems`;
- Select `JavaScript modules (import/export)`;
- Select `React`;
- Select `No` for TypeScript;
- Press `a` to select node and browser, followed by `Enter`;
- Select `JavaScript` as configuration file format;
- Finally, select `Yes` to install dependencies and `npm` as package manager.

### eslintrc.js

- Create a file named `.eslintrc.js` in the root of the project and add the following content:

~~~js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
  },
};
~~~

### another approach for eslintrc.json

~~~json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "prettier/prettier": ["error", { "singleQuote": true }]
  }
}
~~~

- Use the following command to install the dependencies:

~~~properties
npm i -D prettier eslint-plugin-prettier eslint-config-prettier
~~~

- Install eslint extension for vscode if not already installed.

- On VSCode settings, add the following if you want to format on save:

~~~json
// Format on save
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
  "source.fixAll": true
},
~~~

## Prettier

- Create a file named `.prettierrc.json` in the root of the project and add the following content:

~~~json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
~~~
