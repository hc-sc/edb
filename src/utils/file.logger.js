const fs = require('fs');
const util = require('util');
const Console = console.Console;
const { dialog } = require('electron');
const basePath = fs.realpathSync('./');
const path = require('path');

class GhstsLogger {
  constructor(infoFileName, errFileName) {
    if (!global.ghstsLogger) {
      try {
        fs.mkdirSync(path.resolve(basePath, 'logs'));
      } catch (err) {
        if (err.code !== 'EEXIST') {
          dialog.showErrorBox('Cannot create folder', 'Application will exit. Please make sure you have full access to the application folder.');
          process.exit(1);
        }
      }
      let dateStr = new Date();
      dateStr = dateStr.toISOString().substr(0, 10);
      let loggerOutput = fs.createWriteStream(infoFileName ? infoFileName : path.resolve(basePath, 'logs', 'edbstdout' + dateStr + '.log'), {'flags': 'a'});
      let loggerErrorOutput = fs.createWriteStream(errFileName ? errFileName : path.resolve(basePath, 'logs', 'edbstderr' + dateStr + '.log'), {'flags': 'a'});
      // custom simple logger
      this.logger = new Console(loggerOutput, loggerErrorOutput);
      global.ghstsLogger = this;
    }
  }

  log(args) {
    if (arguments.length === 1) // string 
      this.logger.log(util.format('%s - %s : %s', (new Date()).toISOString(), 'INFO', args));
    else if (arguments.length === 2 && args.stack) { //for unhandledRejection
      let argsArray = Array.from(arguments);
      this.logger.warn(util.format('%s - %s [Promise: %s ]', (new Date()).toISOString(), 'Unhandled Rejection', argsArray[1].toString()));
      this.logger.warn(args.stack.toString());
    } else
      this.logger.log(args);
  }

  info(args) {
    this.log(args);
  }

  warn(args) {
    if (arguments.length === 1) {
      this.logger.warn(util.format('%s - %s', (new Date()).toISOString(), args.toString()));
      this.logger.warn(args.stack.toString());
    } else 
      this.logger.warn(args);
  }

  error(args) {
    this.warn(args);
  }

  dir(object, options) {
    this.logger.dir(object, options);
  }

  time(label) {
    this.logger.time(label);
  }

  timeEnd(label) {
    this.logger.timeEnd(label);
  }

  trace(args) {
    this.logger.trace(args);
  }

  assert(expression, args) {
    this.logger.assert(expression, args);
  }
}

module.exports = new GhstsLogger();
module.exports.GhstsLogger = GhstsLogger;