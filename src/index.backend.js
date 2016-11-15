
'use strict';
global.modulesInMemory = {};

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
const Jsonix = require('jsonix').Jsonix;

var lastMessageTimestamp;  //For debug track if there are duplicatied message request from front-end

var mainWindow = null;

var submissions = [];

var svrDisp;

var XMLSchemaJsonSchema;
var JsonixJsonSchema;
var supprtVersions = ['01.00.00'], validateInsts = {}, marshallers = {}, unmarshallers = {};
var ajvInst;
var init_mongoose = function () {
  try {
    let mongoose = require('mongoose');
    mongoose.Promise = Q;
    console.log('Running mongoose version %s', mongoose.version);
    mongoose.connect('tingodb://' + __dirname + '/../data');

    let srvs = require('./services').ServiceNeedInit;
    let qs = [];

    for (var i = 0; i < srvs.length; i++) {
      let svrmod = require('./services/' + srvs[i] + '.service');
      let svrInst = new svrmod();
      qs.push(svrInst.initMongoose());
    }
    Q.all(qs)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
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
  let timestamp = arg.timestamp;
  if (lastMessageTimestamp === timestamp) {
    console.log('There are duplicatied message request');
  }
  lastMessageTimestamp = timestamp;
  svr[method](arg.data).then(result => {
    event.sender.send(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, result);
  })
    .catch(err => {
      event.sender.send(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, err);
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
  let svr = new GhstsService(submissions, validateInsts['01_00_00']);
  let method = 'edb_' + arg.method;
  let timestamp = arg.timestamp;
  if (lastMessageTimestamp === timestamp) {
    console.log('There are duplicatied message request');
  }
  lastMessageTimestamp = timestamp;
  svr[method](arg.data).then(result => {
    event.sender.send(SHARED_CONST.GHSTS_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, result);
  })
    .catch(err => {
      event.sender.send(SHARED_CONST.GHSTS_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, err);
    });
});

ipc.on(SHARED_CONST.GHSTS_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
  let svr = new GhstsService(submissions, validateInsts['01_00_00']);
  if (arg.method !== 'get') {
    event.returnValue = new RVHelper('EDB10003');
  } else {
    let method = 'edb_' + arg.method + 'Sync';
    event.returnValue = svr[method](arg.data);
  }
});

ipc.on(SHARED_CONST.APP_DATA_MSG_CHANNEL, function (event, arg) {
  if (!svrDisp)
    svrDisp = new ServiceDispatcher();
  let svr = svrDisp.getService(arg.url);
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
      event.sender.send(SHARED_CONST.APP_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, err);
    });
});

ipc.on(SHARED_CONST.APP_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
  if (arg.method !== 'get') {
    event.returnValue = new RVHelper('EDB10003');
  } else {
    if (!svrDisp)
      svrDisp = new ServiceDispatcher();
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

  for (let i = 0; i < supprtVersions.length; i++) {
    let versionDir = supprtVersions[i].replace(/\./g, '_');
    let GHSTSJsonSchema = JSON.parse(fs.readFileSync('./resources/app/standards/' + versionDir + '/GHSTSMappings.jsonschema').toString());
    validateInsts[versionDir] = ajvInst.compile(GHSTSJsonSchema);
    let GHSTSMappings = require('../resources/app/standards/' + versionDir + '/GHSTSMappings').GHSTSMappings;
    let context = new Jsonix.Context([GHSTSMappings]);
    unmarshallers[versionDir] = context.createUnmarshaller();
    marshallers[versionDir] = context.createMarshaller();
  }

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

  mainWindow.loadURL('file://' + __dirname + '/../build/renderer/index.html');
  mainWindow.webContents.on('did-finish-load', function () {
    // TODO: setTitle is being deprecated, find and use alternative
    mainWindow.setTitle("e-Dossier Builder (V1.0.0)");
    //if (configure.env.toString().toUpper() == 'DEV'){
    mainWindow.openDevTools();
    backendTest();

    //}
  });
  mainWindow.show();
});

//Test request
const testService = require('./services/substance.service');
var backendTest = function() {
  console.log('--------- Backend Test Start ----------');
  new testService().edb_put(        {
          "id": "IDS0000000112",
          "metadatastatus": "582b14ac33dd330be44a3f59",
          "substancename": "Fenpyroxymate",
          "substancepid": "urn:ghsts:AF92CDE4-E66E-415E-AA9C-49F5EE5568C1",
          "substanceidentifier": [
            {
              "substanceidentifiertype": "582b14ac33dd330be44a3f6c",
              "identifier": "134098-61-6"
            }
          ]
        }).then(result => {
    console.log(result);
  });
  console.log('--------- Backend Test End ----------');
};

//Test request end

