
'use strict';

global.TUNGUS_DB_OPTIONS =  { nativeObjectID: true, searchInArray: true };  

const tungus = require('tungus'); 

const path = require('path');
const fs = require('fs');
const app = require('electron').app;
const ipc = require('electron').ipcMain;
const BrowserWindow = require('electron').BrowserWindow;

const SHARED_CONST = require('./constants/shared');
const BACKEND_CONST = require('./constants/backend');

const PicklistService = require('./services/picklist.service');
const GhstsService = require('./services/ghsts.service');
const ServiceDispatcher = require('./services/service.dispatcher');
const RVHelper = require('./utils/return.value.helper');

const SubstanceService = require('./services/substance.service');

const Q = require('bluebird');

const AJV = require('ajv');


var mainWindow = null;

var picklistInst = null;

var submissions = [];

var svrDisps = {};

var XMLSchemaJsonSchema;
var JsonixJsonSchema;
var ajvInst, validateInst, GHSTSJsonSchema;

var init_mongoose = function() {
  let mongoose = require('mongoose');
  mongoose.Promise = Q;
  console.log('Running mongoose version %s', mongoose.version);
  mongoose.connect('tingodb://'+__dirname+'/../data', (err) => {
    console.log(err);
  });
  var picklistModelSchema = new mongoose.Schema({
  TYPE_NAME: { type: String, require: true },
  VALUE: { type: String, require: true },
  VALUE_DECODE: { type: String, require: true },
  STATUS: { type: String, require: true, default: 'enabled' },
  isExt: { type: Boolean, require: true, default: true }
});
mongoose.model('Picklist', picklistModelSchema);
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
  let method = 'edb_' + arg.method + 'Sync';
  event.returnValue = svr[method](arg.data);
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
  //  let svr = new PicklistService(q);
  //  let method = 'edb_' + arg.method + 'Sync';
  //  event.returnValue = svr[method](arg.data);
  event.returnValue = new RVHelper('EDB00001');
});


ipc.on(SHARED_CONST.APP_DATA_MSG_CHANNEL, function (event, arg) {
  let svrDisp;
  if (!svrDisps[BACKEND_CONST.APP_LEVEL_SERVICE]) {
    svrDisps[BACKEND_CONST.APP_LEVEL_SERVICE] = svrDisp = new ServiceDispatcher(BACKEND_CONST.APP_LEVEL_SERVICE);
  } else {
    svrDisp = svrDisps[BACKEND_CONST.APP_LEVEL_SERVICE];
  }
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
//  let svr = new PicklistService(q);
//  let method = 'edb_' + arg.method + 'Sync';
  event.returnValue = new RVHelper('EDB00001');
});


ipc.on(SHARED_CONST.DOSSIER_DATA_MSG_CHANNEL, function (event, arg) {
  let svrDisp;
  if (!svrDisps[BACKEND_CONST.DOSSIER_LEVEL_SERVICE]) {
    svrDisps[BACKEND_CONST.DOSSIER_LEVEL] = svrDisp = new ServiceDispatcher(BACKEND_CONST.DOSSIER_LEVEL);
  } else {
    svrDisp = svrDisps[BACKEND_CONST.DOSSIER_LEVEL];
  }
  let svr = svrDisp.getService(arg.url, submissions[0][BACKEND_CONST.ACTIVE_SUBMISSION_NAME]._prodAndDossierName);
  let method = 'edb_' + arg.method;
  svr[method](arg.data).then(result => {
    event.sender.send(SHARED_CONST.DOSSIER_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, result);
  })
    .catch(err => {
      event.sender.send(SHARED_CONST.DOSSIER_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, err);
    });
});

ipc.on(SHARED_CONST.DOSSIER_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
//  let svr = new PicklistService(q);
//  let method = 'edb_' + arg.method + 'Sync';
  event.returnValue = new RVHelper('EDB00001');
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

  if (!PicklistService.isMongooseSet()) {
    let picklistSrv = new PicklistService();
//    picklistSrv.initMongoose();
    let pls = picklistSrv.initFromXSD();
    pls
      .then(result => {
        if (result.code === 'EDB00000' || result.code === 'EDB20001') {
          picklistInst = picklistSrv;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  if (!SubstanceService.isMongooseSet()) {
    let svrs = new SubstanceService();
    let jsonsche = svrs.initMongoose();
    let mongoose = require('mongoose');
    let nnn = mongoose.model(svrs.modelClassName, new mongoose.Schema(jsonsche));
    let test = new nnn({          "id": "IDS0000003333",
          "metadatastatus": "5820fe086ea4a20c902bdf15",
          "substancename": "RGA1608-05",
          "substancepid": "urn:ghsts:9A5C394B-872E-433B-A391-00899F06613E",
          "substanceidentifier": [
            {
              "substanceidentifiertype": "5820fe086ea4a20c902bdf15",
              "identifier": "616890-34-1"
            }]
          });
    test.save();
    console.log('here');
  }

  mainWindow.loadURL('file://' + __dirname + '/../build/renderer/index.html');
  mainWindow.webContents.on('did-finish-load', function () {
    // TODO: setTitle is being deprecated, find and use alternative
    mainWindow.setTitle("e-Dossier Builder (V1.0.0)");
    //if (configure.env.toString().toUpper() == 'DEV'){
    mainWindow.openDevTools();

    //}
  });
  mainWindow.show();
});
