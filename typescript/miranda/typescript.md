# TypeScript

## Installation

- package manager to start a new project
- typescript compiler
- ts-node to run typescript code on Code Runner
- eslint for linting
- plugins to integrate eslint with typescript
- create folder .vscode and create file settings.json
- create folder src and create file index.ts
- create file .eslintrc.js
- create file .prettierrc.js
- initialize tsconfig.json
- in tsconfig.json, change lib array, change outDir to ./dist, if it is a new project, and leave strict as true, else false for migration
- use extension EditorConfig for VS Code to use .editorconfig file and change trim_trailing_whitespace and insert_final_newline to true

### start package manager

```properties
npm init -y
```

### install typescript

```properties
npm i -D typescript
```

### install ts-node

```properties
npm i -D ts-node
```

### install eslint and prettier

```properties
npm i -D eslint
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

### start tsconfig.json

```properties
npx tsc --init
```

### all-in-one

```properties
npm init -y && npm i -D typescript ts-node eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier eslint-config-prettier eslint-plugin-prettier && npx tsc --init
```

## Configuration

### script mode

Script mode is the default mode of TypeScript, where every file work as a single one. So you can't use the same variable name in different files.

### module mode

Module mode is activated when you use the `export` keyword. It allows you to use the same variable name in different files.
