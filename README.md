# Project Setup Guide. Webpack, ESLint and Prettier.

---

Download and configuration instructions for my basic project setup, plus notes for using webpack.

## ESLint / Prettier

### Downloads

- Start by installing the ESLint and Prettier vscode extensions.
- Set vscode settings `format on save` to true and `default formatter` to `prettier`. This will allow prettier to auto-format your code on each save.
- Open new project folder.
- Install npm packages.

```
npm init -y
```

```
npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node
```

- Install Airbnb style guide config.

  If the first command does not work, try the second for mac/linux or the third for windows.

```
npx install-peerdeps --dev eslint-config-airbnb
```

```
(
  export PKG=eslint-config-airbnb;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
)
```

```
npm install -g install-peerdeps
install-peerdeps --dev eslint-config-airbnb
```

### Configuration

- Create a .prettierrc file in root project folder. More options available on [prettier website.](https://prettier.io/docs/en/options.html)

```js
// .prettierrc
{
  "singleQuote": true
}
```

- Create a .eslintrc.json file in root project folder. Add / remove individual rules to suit personal preference. Rules can be found on the [ESLint website](https://eslint.org/docs/rules/) or in the problems tab when they are encounted in your code.

```js
// .eslintrc.json
{
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "warn",
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    "no-plusplus":"off"
  },
  "env": {
    "browser": true,
    "node": true
    }
}
```

- Create a new file in the project root called `.eslintignore` and inside it simply write `dist/`. This will prevent ESLint from examining the code that webpack produces for us.
- Basic ESLint and Prettier setup is now complete!

## Webpack

This is a summary of Colt Steele's ["Learn Webpack - Full Tutorial for Beginners"](https://www.youtube.com/watch?v=MpGLUVbqoYQ) with some added notes of my own.

### What Even Is Webpack?

[Video Tutorial.](https://www.youtube.com/watch?v=3On5Z0gjf4U&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8)

Put simply, webpack bundles together all of your development files into fewer files that can be minified/optimized. Webpack manages all of your dependencies for you, so you don't have to worry about making sure to load different scripts in the correct order. Webpack can also set up a development server for you project, that updates your page with every save. You may have used something like the Live Server extension to do this. Webpack can also complile sass / optimize images and much, much more.

### Installing and Running Webpack and Webpack-CLI

[Video Tutorial.](https://www.youtube.com/watch?v=5XrYSbUbS9o&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=2)

- If you havn't already, set up package.json

```
npm init -y
```

- Install Webpack.

```
npm install --save-dev webpack webpack-cli
```

- Add "start" script to package.json. Calling `npm start` will run webpack. Later on we will define a seperate development and build script.

```js
"scripts": {
    "start": "webpack"
  }
```

- At this point, webpack will look to bundle a file named `index.js` inside of `/src`, and will output `main.js` to `/dist`. These file and folder names is the default configuration and will be changed later.
- This is the most basic webpack setup and could be all you need for a very simple project. Inside of index.js you would have all the imports to your other scripts / modules and whatever logic to make your app run. Webpack will combine all the scripts / modules into main.js, which you will link to in your html. At the moment, you will need to run `npm start` every time you change a file. If this simple webpack setup is all you need, then you can run `npx webpack --watch` and it will automatically run webpack everytime you save a changed file. Otherwise, we will continue setting up a more complicated webpack configuration.

### Imports, Exports, & Webpack Modules

[Video Tutorial.](https://www.youtube.com/watch?v=8QYt1_17nk8&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=3)

- This video just goes over ES6 modules with respect to webpack. If you are unsure how to split your script up and use imports / exports then watch this and the previous video tutorial.

### Configuring Webpack

[Video Tutorial.](https://www.youtube.com/watch?v=ZwWiDZoPMB0&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=4)

- Create a new file in the project root and call it `webpack.config.js`. Inside of here is where we will write all our webpack configurations.

```js
// webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

- So far all we have done is explicitly tell webpack the default options. That is, to look for a file called `index.js` located in `/src` and to then output a file called `main.js` into `/dist`. We will soon add a lot more options.
- To tell webpack to use this particular config, we need to change the `start` script inside of `package.json`.

```js
"scripts": {
    "start": "webpack --config webpack.config.js"
  }
```

- At the moment, webpack is minifying our code. This is great for production but while we are developing, it would be nicer to have some code that is easier to read. By default, webpack minifies `main.js`. We can override this by adding `mode: 'development'` to `module.exports` inside of `webpack.config.js`. Our configuration file will now look like the following.

```js
// webpack.config.js

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```
