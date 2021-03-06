let version = require('./package.json').version;
const INCLUDE_SAMPLES = false;

const title = `eDossier Builder (v${version.split('.').slice(0, 2).join('.')})`;

'use strict';
let ghstsLogger = require('./utils/file.logger');
const { dialog } = require('electron');
process.on('uncaughtException', (err) => {
  ghstsLogger.error(err);
  dialog.showErrorBox('Uncaught Exception', 'Uncaught exception, application will close. Please check log file');
  process.nextTick(() => {process.exit(1);});
});

process.on('unhandledRejection', (err, p) => {
  ghstsLogger.log(err, p);
});

global.modulesInMemory = {};

global.TUNGUS_DB_OPTIONS = { nativeObjectID: true, searchInArray: true };

require('tungus');

const path = require('path');
const fs = require('fs');
const app = require('electron').app;
const ipc = require('electron').ipcMain;
const BrowserWindow = require('electron').BrowserWindow;
const copydir = require('copy-dir');

const _ = require('lodash');

const SHARED_CONST = require('./constants/shared');
const BACKEND_CONST = require('./constants/backend');
const ServiceDispatcher = require('./services/service.dispatcher');
const PicklistService = require('./services/picklist.service');
const GhstsService = require('./services/ghsts.service');
const RVHelper = require('./utils/return.value.helper').ReturnValueHelper;

const Q = require('bluebird');

const AJV = require('ajv');
const Jsonix = require('jsonix').Jsonix;
const basePath = fs.realpathSync('./');

var lastMessageTimestamp;  //For debug track if there are duplicatied message request from front-end

var mainWindow = null;

var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

var submissions = [];

var svrDisp;

var XMLSchemaJsonSchema;
var JsonixJsonSchema;
var supprtVersions = ['01.04.00'], validateInsts = {}, marshallers = {}, unmarshallers = {};
var ajvInst;

var init_mongoose = () => {
  try {
    let mongoose = require('mongoose');
    mongoose.Promise = Q;
    console.log('Running mongoose version %s', mongoose.version);
    mongoose.connect('tingodb://' + path.resolve(basePath, 'data'));

    let srvs = require('./services').ServiceNeedInit;
    let qs = [];

    for (var i = 0; i < srvs.length; i++) {
      let svrmod = require('./services/' + srvs[i] + '.service');
      let svrInst = new svrmod(supprtVersions[0]);
      qs.push(svrInst.initMongoose());
    }
    return Q.all(qs);
  } catch (err) {
    console.log(err);
  }
};

var init = () => {
  let dataPath = path.join(basePath, BACKEND_CONST.DATA_DIR);
  let viewerConfPath;
  let fstat, needInitDB = true;
  try {
    fstat = fs.statSync(dataPath);
    if (fstat.isDirectory()) {
      console.log(fs.readdirSync(dataPath).length);
      needInitDB = (fs.readdirSync(dataPath).length <= 1);
    } else {
      throw new Error('The data directory is not a directory');
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        fstat = fs.mkdirSync(dataPath);
      } catch (err) {
        throw new Error(err);
      }
    } else {
      console.log(err);
      throw new Error(err);
    }
  }

  dataPath = path.resolve(basePath, BACKEND_CONST.VIEWER_EXEC_DIR_NAME);
  try {
    fstat = fs.statSync(dataPath);
    if (fstat.isDirectory()) {
      console.log(fs.readdirSync(dataPath).length);
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        let viewerExecSource = path.resolve(basePath, BACKEND_CONST.BASE_DIR1, BACKEND_CONST.BASE_DIR2, BACKEND_CONST.VIEWER_EXEC_DIR_NAME);
        copydir.sync(viewerExecSource, dataPath);
        viewerConfPath = path.resolve(dataPath, BACKEND_CONST.VIEWER_CONF_DIR_NAME);
        fstat = fs.statSync(viewerConfPath);
        if (fstat.isDirectory()) {
          console.log(fs.readdirSync(viewerConfPath).length);
        }
      } catch (err) {
        if (err.code === 'ENOENT') {
          try {
            fs.mkdirSync(viewerConfPath);
          } catch (err) {
            throw err;
          }
        } else
          throw err;
      }
    } else {
      console.log(err);
      throw err;
    }
  }

  init_mongoose()
    .then(result => {
      // console.log(result);
      if (needInitDB) {
        setTimeout(() => {
          //  console.log('time is up');
          initDB()
            .then(result => {
              // console.log(result);
            })
            .catch(err => {
              console.log(err);
            });
        }, 1000);
      }
      else
        return new RVHelper('EDB00000');
    })
    // .then(ret => {
    //   // console.log(ret);
    // })
    .catch(err => {
      console.log(err);
    });

};

//For development only, should be removed when goes into production
var initDB = () => {
  //let ghstsSrv = new GhstsService(undefined, undefined, marshallers['01_00_02'], unmarshallers['01_00_02']);
  return new Q((res, rej) => {
    let plkClass = require('./services/picklist.service');
    let plkSvr = new plkClass();
    plkSvr.edb_get().then(ret => {
      if (ret.data.length <= 0)
        rej(new Error('picklist not done yet.'));
      else {
        let qAry = [];
        let svrClass;
        let svr;

        // NOTE: only true tombstone data will work here,
        // you cannot have data that required references (i.e. toLegalEntityId)
        if (INCLUDE_SAMPLES) {
          // svrClass = require('./services/product.service');
          // svr = new svrClass('01.04.00');
          // qAry.push(svr.initDbfromTestData());

          svrClass = require('./services/legalentity.service');
          svr = new svrClass('01.04.00');
          qAry.push(svr.initDbfromTestData());
          svrClass = require('./services/substance.service');
          svr = new svrClass('01.04.00');
          qAry.push(svr.initDbfromTestData());
          // svrClass = require('./services/file.service');
          // svr = new svrClass('01.04.00');
          // qAry.push(svr.initDbfromTestData());
          // svrClass = require('./services/document.service');
          // svr = new svrClass('01.04.00');
          // qAry.push(svr.initDbfromTestData());
          // svrClass = require('./services/receiver.service');
          // svr = new svrClass('01.04.00');
          // qAry.push(svr.initDbfromTestData());
          // svrClass = require('./services/sender.service');
          // svr = new svrClass('01.04.00');
          // qAry.push(svr.initDbfromTestData());
        }

        // NOTE: This is REQUIRED to have the OECD definition show up when
        // creating a new dossier
        svrClass = require('./services/toc.service');
        svr = new svrClass('01.04.00');
        qAry.push(svr.initDbfromTestData());

        res(Q.all(qAry));
      }
    })
      .catch(err => {
        rej(err);
      });
  });
};

ipc.on('devTools', function (event, arg) {
  mainWindow.openDevTools();
});

ipc.on(SHARED_CONST.PICKLIST_MSG_CHANNEL, function (event, arg) {
  let svr = new PicklistService();
  let method = 'edb_' + arg.method;
  let timestamp = arg.timestamp;
  if (lastMessageTimestamp === timestamp) {
    console.log('There are duplicatied message request');
  }
  lastMessageTimestamp = timestamp;
  svr[method](arg.data).then(result => {
    event.sender.send(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, result);
  })
    .catch(err => {
      let retValue = {code: err.code, message: err.message, data: err.data };
      event.sender.send(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, {err: retValue});
    });
});

ipc.on(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
  if (arg.method !== 'get') {
    event.returnValue = new RVHelper('EDB10003');
  } else {
    let method = 'edb_' + arg.method + 'Sync';
    event.returnValue = PicklistService[method](arg.data);
  }
});

ipc.on(SHARED_CONST.GHSTS_MSG_CHANNEL, function (event, arg) {
  let svr = new GhstsService(submissions, validateInsts, marshallers, unmarshallers, '01.04.00');
  let timestamp = arg.timestamp;
  if (lastMessageTimestamp === timestamp) {
    console.log('There are duplicatied message request');
  }
  lastMessageTimestamp = timestamp;

  let method = 'edb_' + arg.method, newData = arg.data ? _.merge({}, arg.data) : undefined;

  if (newData && BACKEND_CONST.HTML5_METHODS.indexOf(arg.method) >= 0) {  /// may have sub-url
    if ((arg.url && arg.url !== 'ghsts') && (arg.data && arg.data._url && arg.data._url !== 'ghsts')) { ///has sub-url
      if (arg.url === arg.data._url)
        newData._subUrl = arg.url.replace('/^ghsts\//', '');
      else
        newData._subUrl = arg.url.replace('/^ghsts\//', '').concat('/').concat(arg.data._url.replace('/^ghsts/', ''));
    } else if (arg.url && arg.url !== 'ghsts') {
      newData._subUrl = arg.url.replace('/^ghsts\//', '');
    } else if (arg.data && arg.data._url && arg.data._url !== 'ghsts') {
      newData._subUrl = arg.data._url.replace('/^ghsts/', '');
    }
  }
  svr[method](newData).then(result => {
    event.sender.send(SHARED_CONST.GHSTS_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, result);
  })
    .catch(error => {
      let retValue = {code: error.code, message: error.message, data: error.data };
      event.sender.send(SHARED_CONST.GHSTS_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, {err: retValue});
    });
});

ipc.on(SHARED_CONST.GHSTS_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
  if (arg.method !== 'get') {
    event.returnValue = new RVHelper('EDB10003');
  } else {
    let method = 'edb_' + arg.method + 'Sync';
    event.returnValue = GhstsService[method](arg.data);
  }
});

ipc.on(SHARED_CONST.APP_DATA_MSG_CHANNEL, function (event, arg) {
  if (!svrDisp)
    svrDisp = new ServiceDispatcher();
  let svr = svrDisp.getService(arg.url, '01.04.00');
  let method = 'edb_' + arg.method;
  let timestamp = arg.timestamp;
  if (lastMessageTimestamp === timestamp) {
    console.log('There are duplicatied message request');
  }
  lastMessageTimestamp = timestamp;
  svr[method](arg.data).then(result => {
    event.sender.send(SHARED_CONST.APP_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, result);
  })
    .catch(err => {
      let retValue = {code: err.code, message: err.message, data: err.data };
      event.sender.send(SHARED_CONST.APP_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, {err: retValue});
    });
});

ipc.on(SHARED_CONST.APP_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
  if (arg.method !== 'get') {
    event.returnValue = new RVHelper('EDB10003');
  } else {
    if (!svrDisp)
      svrDisp = new ServiceDispatcher();
    let svr = svrDisp.getServiceClass(arg.url, '01.04.00');
    let method = 'edb_' + arg.method + 'Sync';
    event.returnValue = svr[method](arg.data);
  }
});

app.on('before-quit', function () {
  ghstsLogger.info('Application ended.');
});

app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', function () {
  if (shouldQuit) {
    app.quit();
    return;
  }

  ghstsLogger.info('Application started, ENV: ' + process.env.NODE_ENV);
  XMLSchemaJsonSchema = JSON.parse(fs.readFileSync('./resources/app/standards/jsonschemas/w3c/2001/XMLSchema.jsonschema').toString());
  JsonixJsonSchema = JSON.parse(fs.readFileSync('./resources/app/standards/jsonschemas/jsonix/Jsonix.jsonschema').toString());

  ajvInst = new AJV({ allErrors: true });
  ajvInst.addSchema(XMLSchemaJsonSchema, 'http://www.jsonix.org/jsonschemas/w3c/2001/XMLSchema.jsonschema');
  ajvInst.addSchema(JsonixJsonSchema, 'http://www.jsonix.org/jsonschemas/jsonix/Jsonix.jsonschema');

  // FOR VALIDATING GHSTS +++++++++++++++++++++++++++++++

  for (let i = 0; i < supprtVersions.length; i++) {
    let versionDir = supprtVersions[i].replace(/\./g, '_');
    let GHSTSJsonSchema = JSON.parse(fs.readFileSync('./resources/app/standards/' + versionDir + '/GHSTS.jsonschema').toString());
    validateInsts[versionDir] = ajvInst.compile(GHSTSJsonSchema);
    //    let GHSTS = require('../resources/app/standards/' + versionDir + '/GHSTS').GHSTS;
    let sfile = path.resolve(basePath, 'resources', 'app', 'standards', versionDir, 'GHSTS.js');
    let GHSTS = require(sfile).GHSTS;
    let context = new Jsonix.Context([GHSTS],
      {
        namespacePrefixes: {
          'http://www.oecd.org/GHSTS': ''
        }
      }
    );
    unmarshallers[versionDir] = context.createUnmarshaller();
    marshallers[versionDir] = context.createMarshaller();
  }

  init();

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      // nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    // BrowserWindow.addDevToolsExtension('C:\\Users\\hcuser\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\3.1.6_0');
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'));
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/vue-devtools'));

    mainWindow.loadURL('file://' + __dirname + '/../build/renderer/index.html');
  } else
    mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.setTitle(title);
  mainWindow.webContents.on('did-finish-load', function () {
    // TODO: setTitle is being deprecated, find and use alternative
    mainWindow.setTitle(title);
    //if (configure.env.toString().toUpper() == 'DEV'){
    if (process.env.NODE_ENV === 'development')
      mainWindow.openDevTools();
  });
  mainWindow.show();
});
