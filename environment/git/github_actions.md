# GitHub Actions

## Creating a workflow for React

* Create a new workflow in the `.github/workflows` directory, in the root of the repository;
* The workflow file must be named `main.yml`.

~~~yml
name: CI

on: # Triggers the workflow on push or pull request events but only for the branches specified
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch: # Allows to run the workflow manually on GitHub

env: # Environment variables
  NODE_ENV: development

jobs: # A workflow run is made up of one or more jobs that can run sequentially or in parallel
  build:
    runs-on: ubuntu-latest # The type of machine to run the job on
    steps: # A sequence of tasks that will be executed as part of the job
    - name: Checkout code # The name of the step
      uses: actions/checkout@v3 # The action to be executed

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with: # The version of Node.js to use
        node-version: 14

    - name: Install dependencies
      run: | # ci installs the dependencies from the lock file
        npm ci

    - name: Run ESLint
      run: | # Runs the linter
        npm run lint

    - name: Run tests
      run: | # Runs the tests
        npm test

    - name: Run coverage
      run: | # Runs the coverage
        npm run coverage

    - name: Report coverage
      uses: actions/upload-artifact@v3 # Uploads the coverage report
      with:
        name: coverage
        path: coverage
~~~
