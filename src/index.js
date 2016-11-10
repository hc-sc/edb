'use strict';

global.TUNGUS_DB_OPTIONS = { nativeObjectID: true, searchInArray: true };

const tungus = require('tungus');

const path = require('path');
const fs = require('fs');
const app = require('electron').app;
const ipc = require('electron').ipcMain;
const BrowserWindow = require('electron').BrowserWindow;

const SHARED_CONST = require('./constants/shared');
const BACKEND_CONST = require('./constants/backend');
const ServiceDispatcher = require('./services/service.dispatcher');
const PicklistService = require('./services/picklist.service');
const GhstsService = require('./services/ghsts.service');
const RVHelper = require('./utils/return.value.helper');

const Q = require('bluebird');

const AJV = require('ajv');


var mainWindow = null;

var submissions = [];

var svrDisp;

var XMLSchemaJsonSchema;
var JsonixJsonSchema;
var ajvInst, validateInst, GHSTSJsonSchema;

var init_mongoose = function () {
  try {
    let mongoose = require('mongoose');
    mongoose.Promise = Q;
    console.log('Running mongoose version %s', mongoose.version);
    mongoose.connect('tingodb://' + __dirname + '/../data');

    let srvs = require('./services').ServiceNeedInit;
    srvs.map(svr => {
      let svrmod = require('./services/' + svr + '.service');
      let svrInst = new svrmod('01.00.00');
      svrInst.initMongoose()
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    });
  } catch (err) {
    console.log(err);
  }
};

ipc.on('devTools', function (event, arg) {
  mainWindow.openDevTools();
});

ipc.on(SHARED_CONST.PICKLIST_MSG_CHANNEL, function (event, arg) {
  let svr = new PicklistService();
  let method = 'edb_' + arg.method;
  svr[method](arg.data).then(result => {
    event.sender.send(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, result);
  })
    .catch(err => {
      event.sender.send(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, err);
    });
});

ipc.on(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
  let svr = new PicklistService();
  if (arg.method !== 'get') {
    event.returnValue = new RVHelper('EDB10003');
  } else {
    let method = 'edb_' + arg.method + 'Sync';
    event.returnValue = svr[method](arg.data);
  }
});

ipc.on(SHARED_CONST.GHSTS_MSG_CHANNEL, function (event, arg) {
  let svr = new GhstsService(submissions, validateInst);
  let method = 'edb_' + arg.method;
  svr[method](arg.data).then(result => {
    event.sender.send(SHARED_CONST.GHSTS_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, result);
  })
    .catch(err => {
      event.sender.send(SHARED_CONST.GHSTS_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, err);
    });
});

ipc.on(SHARED_CONST.GHSTS_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
  let svr = new GhstsService(submissions, validateInst);
  if (arg.method !== 'get') {
    event.returnValue = new RVHelper('EDB10003');
  } else {
    let method = 'edb_' + arg.method + 'Sync';
    event.returnValue = svr[method](arg.data);
  }
});

ipc.on(SHARED_CONST.APP_DATA_MSG_CHANNEL, function (event, arg) {
  if (!svrDisp)
    svrDisp = new ServiceDispatcher(BACKEND_CONST.APP_LEVEL_SERVICE);
  let svr = svrDisp.getService(arg.url);
  let method = 'edb_' + arg.method;
  svr[method](arg.data).then(result => {
    event.sender.send(SHARED_CONST.APP_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, result);
  })
    .catch(err => {
      event.sender.send(SHARED_CONST.APP_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, err);
    });
});

ipc.on(SHARED_CONST.APP_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
  if (arg.method !== 'get') {
    event.returnValue = new RVHelper('EDB10003');
  } else {
    if (!svrDisp)
      svrDisp = new ServiceDispatcher(BACKEND_CONST.APP_LEVEL_SERVICE);
    let svr = svrDisp.getService(arg.url);
    let method = 'edb_' + arg.method;
    event.returnValue = svr[method](arg.data);
  }
});

app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', function () {

  //  XMLSchemaJsonSchema = JSON.parse(fs.readFileSync('./node_modules/jsonix/jsonschemas/w3c/2001/XMLSchema.jsonschema').toString());
  //  JsonixJsonSchema = JSON.parse(fs.readFileSync('./node_modules/jsonix/jsonschemas/jsonix/Jsonix.jsonschema').toString());

  XMLSchemaJsonSchema = JSON.parse(fs.readFileSync('./resources/app/standards/jsonschemas/w3c/2001/XMLSchema.jsonschema').toString());
  JsonixJsonSchema = JSON.parse(fs.readFileSync('./resources/app/standards/jsonschemas/jsonix/Jsonix.jsonschema').toString());

  ajvInst = new AJV({ allErrors: true });
  ajvInst.addSchema(XMLSchemaJsonSchema, 'http://www.jsonix.org/jsonschemas/w3c/2001/XMLSchema.jsonschema');
  ajvInst.addSchema(JsonixJsonSchema, 'http://www.jsonix.org/jsonschemas/jsonix/Jsonix.jsonschema');

  // FOR VALIDATING GHSTS +++++++++++++++++++++++++++++++

  GHSTSJsonSchema = JSON.parse(fs.readFileSync('./resources/app/standards/01-00-00/GHSTSMappings.jsonschema').toString());
  validateInst = ajvInst.compile(GHSTSJsonSchema);

  init_mongoose();
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  
  mainWindow.loadURL('file://' + __dirname + '/renderer/index.html');
  mainWindow.webContents.on('did-finish-load', function () {
    // TODO: setTitle is being deprecated, find and use alternative
    mainWindow.setTitle("e-Dossier Builder (V1.0.0)");
    //if (configure.env.toString().toUpper() == 'DEV'){
    mainWindow.openDevTools();
    //}
  });
  mainWindow.show();
});
