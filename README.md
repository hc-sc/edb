# Electronic Dossier Builder (edb)
eDB was commissioned by PMRA to provide desktop tooling that builds Regulatory Submissions that conform to the [Global Harmonised Submission Transport Standard](http://www.oecd.org/chemicalsafety/submission-transport-standard/) (GHSTS).

It is built on [electron](https://github.com/atom/electron) using the [Application Boilerplate for Electron by Thorsten Hans](https://www.xplatform.rocks/2015/05/04/writing-an-electron-atom-shell-app-using-angular-and-es6/).  The salient components currently include:

 * Electron
 * Angular 1.4
 * ES6
 * Angular Material
 * XML2JS
 * NoSQL Javascript Database [NeDB](https://github.com/louischatriot/nedb)


# Instructions for Windows

## PreConditions for client

Ensure that the following node packages are installed on your system.

 * jspm and electron_prebuilt

You can install it using `npm install jspm -g` and `npm install electron-prebuilt -g`.

It is advisable to locally install jspm in addition to globally installing it in order to lock the version of jspm for a specific project. 

Go to app directory and run `npm install jspm`.

## Install dependencies

After cloning the repo execute `npm install` in the 'app' subdirectory to install all dependencies. For the client, `jspm install` will be invoked automatically via a `npm postinstall` script!

## Run the application

Go the parent directory of app, type 'electron app'.

## Creating the Electorn App package

Execute `gulp` in order to build the electron app.

The final electron app will be located as a zip file within the `dist` subfolder. Extract the ZIP file and start the electron app.

Let [me](https://github.com/jhaydt) know if you have any problems.
