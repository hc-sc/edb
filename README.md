# Electronic Dossier Builder (edb)
eDB was commissioned by PMRA to provide desktop tooling that builds Regulatory Submissions that conform to the [Global Harmonised Submission Transport Standard](http://www.oecd.org/chemicalsafety/submission-transport-standard/) (GHSTS).

It is built on [electron](https://github.com/atom/electron) using the [Application Boilerplate for Electron by Thorsten Hans](https://www.xplatform.rocks/2015/05/04/writing-an-electron-atom-shell-app-using-angular-and-es6/).  The salient components currently include:

 * Electron
 * Angular 1.5
 * ES6
 * Angular Material
 * XML2JS
 * NoSQL Javascript Database [NeDB](https://github.com/louischatriot/nedb) via IndexDB via Electron.


# Instructions for Windows

## PreConditions for client

Ensure that the following node packages are installed on your system.

 * jspm and electron_prebuilt

You can install it using `npm install jspm -g` and `npm install electron-prebuilt -g`.

It is advisable to locally install jspm in addition to globally installing it in order to lock the version of jspm for a specific project. This is taken care of by a post install script inside package.json, so no need to run it manually in the local app directory.

## Install dependencies

After cloning the repo execute `npm install` in the repository directory (edb) to install all dependencies including the local JSPM.

## Run the application

Enter command `npm start` at the repository directory.

## Creating the Electorn App package

TBD

Let [me](https://github.com/jhaydt) know if you have any problems.
