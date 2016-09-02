# eDossier Builder

There are two parts, the bundler and the application

To get webpack to bundle the scripts as you write them, type `npm run pack`. You'll see output from webpack about whether or not there were errors in the bundling process, but everything will be green if it worked

To start the application itself, type `npm start` in a different terminal, which will boot up electron with the bundled and transpiled code. When you change a source file and see webpack spit out the transpiled code, you can then refresh electron to see the changes

