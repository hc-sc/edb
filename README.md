# Electronic Dossier Builder (eDB)

eDB was commissioned by PMRA to provide desktop tooling that builds Regulatory Submissions that conform to the [Global Harmonised Submission Transport Standard](http://www.oecd.org/chemicalsafety/submission-transport-standard/) (GHSTS).

It is built on [electron](https://github.com/atom/electron). The salient components currently include:

 * Electron
 * VueJS
 * ES6
 * XML2JS
 * Jsonix
 * Mongoose
 * TingoDB

## Install dependencies

After cloning the repo execute `npm install` in the cloned folder to install all dependencies.

## Run the application

1. Open a terminal and then type `npm run bundle` to get webpack to bundle the UI scripts as you write them. You'll see output from webpack about whether or not there were errors in the bundling process, but everything will be green if it worked
2. Open another terminal and then type `npm start`, which will boot up electron with the bundled and transpiled code.

## Creating the eDB application installer

Open a terminal and then type `npm run dist`, the final eDB application will be located as an executable file within the `prepublish` subfolder.

Run the executable file to install eDB application to start the application.
