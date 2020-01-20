
# Chord Suggester (frontend)

**Initial note**: For a detailed memory about the scope of this project, please visit this [article at `Medium`](https://medium.com/@huanlui/chordsuggester-i-3a1261d4ea9e).

This repository contains the frontend for the DataScience project developed on https://github.com/huanlui/chord-suggester. 

[Live Demo](http://huanlui.github.io)

# User interface manual

![Look&Feel of the application](.doc/user-manual.png)

1. Sheet where our composition is shown. In this case we can see the chords of Pachebel’s Canon (they appear by default).
2. The most probable chord suggested by the model.
3. The second most probable chord suggested by the model.
4. Probability calculated by the model for C chord.
5. Click to listen C chord.
6. Click to add C chord to the sheet (1).
7. Click to choose a custom chord (it can be played or added by using the analogous buttons).
8. Transpose the sheet one semitone down.
9. Transpose the sheet one semitone up.
10. Remove last chord from sheet.
11. Clear the whole sheet.
12. Plays the song.
13. Loads default composition (Pachebel’s canon).
14. Switches from two models (one trained with normalised data, default, and other trained with non-normalised data).

To listen the songs, [Tone.js](https://tonejs.github.io/) has been used.
To show the sheets, [VexFlow](https://github.com/0xfe/vexflow) has been used.

# Installation

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

