
# Chord Suggester (frontend)

This repository contains the frontend for the DataScience project developed on https://github.com/huanlui/chord-suggester. 

[Live Demo](http://huanlui.github.io)

It allows user to:
- Add

## Requirements

* An updated version of [Node.js](https://nodejs.org/es/download/). I used version `v12.9.1`. 
* [Yarn package manager](https://yarnpkg.com/es-ES/docs/install). An equivalent to pip for JavaScript. 

## Quick Start

To run the application (once installed `Node.js` and `yarn`):

- Clone this repo.
- Inside the cloned folder, in a terminal, type:

```bash
yarn install
```
- One finished (it could take several minutes), type:

```bash
yarn start
```

- A navigator should automatically appear with the application running. If doesn't, please, Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Some tests have been included to assure the quality of the codebase. To run them, please type the following in a terminal:

```bash
yarn test
```

## Available Scripts (Detailed)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn install`

Install of the necessary packages that the application needs (declared in `package.json`).

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed! 

The output is the `build` folder, that contains a static page that can be directly copied to `GitHub Pages`. 

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

