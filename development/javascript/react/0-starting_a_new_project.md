# Starting a new project

## When cloning a project

- 1. You might want to remove a few things from the project:

~~~bash
rm -rf .git .cache build exports node_modules package-lock.json .strapi-updater.json
~~~

- 2. Then you can run `npm install` to install the dependencies.

- 3. You can also run `npx npm-check -u` to update the dependencies.
