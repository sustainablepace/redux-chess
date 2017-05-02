# Playing around with Redux, React and Webpack2 #

## Simple Webpack2 config ##

Getting started https://webpack.js.org/guides/get-started/

```bash
npm init -y
npm install --save-dev webpack
```

Creating files

* app/index.js
* index.html
* webpack.config.js

Adding and npm script that runs "webpack"

## ES6 support ##

Add loader babel-loader, see https://webpack.js.org/loaders/babel-loader/

```bash
npm install --save-dev babel-loader babel-core babel-preset-env
```

Add loader to module in webpack config


## HTTP Server ##

```bash
npm install --save-dev http-server
```

npm start in package.json eintragen

"start": "nprm run build && http-server -a localhost -p 8000"


## Chessboard React ##

Using react chess diagram, see https://www.npmjs.com/package/react-chessdiagram

## JSX support in Webpack ##

```bash
npm install babel-preset-react --save-dev
```

added 'react' to babel presets

## Create a wrapper component ##

Move to separate component

Add resolve config to webpack config 








