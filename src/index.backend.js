
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
const RVHelper = require('./utils/return.value.helper').ReturnValueHelper;

const Q = require('bluebird');

const AJV = require('ajv');
const Jsonix = require('jsonix').Jsonix;
const basePath = fs.realpathSync('./');

var lastMessageTimestamp;  //For debug track if there are duplicatied message request from front-end

var mainWindow = null;

var submissions = [];

var svrDisp;

var XMLSchemaJsonSchema;
var JsonixJsonSchema;
var supprtVersions = ['01.00.00'], validateInsts = {}, marshallers = {}, unmarshallers = {};
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
      let svrInst = new svrmod();
      qs.push(svrInst.initMongoose());
    }
    return Q.all(qs);
  } catch (err) {
    console.log(err);
  }
};

var init = () => {
  let dataPath = path.join(basePath, BACKEND_CONST.DATA_DIR);
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

  init_mongoose()
    .then(result => {
      console.log(result);
      if (needInitDB) {
        setTimeout(() => {
//          console.log('time is up');
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
    .then(ret => {
      console.log(ret);
    })
    .catch(err => {
      console.log(err);
    });

};

//For development only, should be removed when goes into production 
var initDB = () => {
  //let ghstsSrv = new GhstsService(undefined, undefined, marshallers['01_00_00'], unmarshallers['01_00_00']);
  return new Q((res, rej) => {
    let plkClass = require('./services/picklist.service');
    let plkSvr = new plkClass();
    plkSvr.edb_get().then(ret => {
      if (ret.data.length <= 0)
        rej(new Error('picklist not done yet.'));
      else {
        let qAry = [];
        let svrClass = require('./services/product.service');
        let svr = new svrClass('01.00.00');
        qAry.push(svr.initDbfromTestData());
        svrClass = require('./services/legalentity.service');
        svr = new svrClass('01.00.00');
        qAry.push(svr.initDbfromTestData());
        svrClass = require('./services/substance.service');
        svr = new svrClass('01.00.00');
        qAry.push(svr.initDbfromTestData());
        svrClass = require('./services/file.service');
        svr = new svrClass('01.00.00');
        qAry.push(svr.initDbfromTestData());
        svrClass = require('./services/document.service');
        svr = new svrClass('01.00.00');
        qAry.push(svr.initDbfromTestData());
        return Q.all(qAry);
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
      event.sender.send(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, err);
    });
});

ipc.on(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
  let svr = new PicklistService();
  if (arg.method !== 'get') {
    event.returnValue = new RVHelper('EDB10003');
  } else {
    let method = 'edb_' + arg.method + 'Sync';
    event.returnValue = PicklistService[method](arg.data);
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
    if (method === 'edb_get' && arg.data) {  // need to refactory
      submissions[0] = JSON.parse(result.data);
    }

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
    let svr = svrDisp.getServiceClass(arg.url);
    let method = 'edb_' + arg.method + 'Sync';
    event.returnValue = svr[method](arg.data);
  }
});

app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', function () {

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
    let context = new Jsonix.Context([GHSTS]);
    unmarshallers[versionDir] = context.createUnmarshaller();
    marshallers[versionDir] = context.createMarshaller();
  }

  init();
  
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
    mainWindow.setTitle("e-Dossier Builder (V1.2.0)");
    //if (configure.env.toString().toUpper() == 'DEV'){
    mainWindow.openDevTools();
    backendTest();

    //}
  });
  mainWindow.show();
});

//Test request
// const testService = require('./services/legalentity.service');
// const testService = require('./services/picklist.service');
// const testService = require('./services/dossier.service');
// const testService = require('./services/substance.service');
// const testService = require('./services/ghsts.service');
// const testService = require('./services/receiver.service');
var backendTest = () => {
console.log('--------- Backend Test Start ----------');
//let svr = new testService();

//svr.edb_delete('58407a642f2d9a1f74416c17');

// svr.edb_put({productShortName: 'test', submissionid: '5845e6427f7372275481989e', productid: '5845e6437f73722754819a39'})
//   .then(ret => {
//     console.log(ret);
// //     return svr.edb_delete(JSON.parse(ret.data)._id);
// //  })
// //  .then(ret => {
// //    console.log(ret);
//  }) 
//  .catch(err => {
//    console.log(err);
//  });


// testService.edb_getSync({_id: '5849d9d3770cf21af410fc5f'})
//   .then(ret => {
//    console.log(ret);
//  }).catch(err => {
//    console.log(err);
//  });

// svr.edb_get({})
//   .then(ret => {
//    console.log(ret);
//  }).catch(err => {
//    console.log(err);
//  });

// svr.edb_get({submissionid: '5845e6427f7372275481989e'})
//   .then(ret => {
//    console.log(ret);
//  }).catch(err => {
//    console.log(err);
//  });

//  svr.edb_put({
//           "TYPE_NAME": "GHSTS.GHSTS.SUBSTANCES.SUBSTANCE",
//           "id": "IDS0000003333",
//           "metadatastatus": 'aaa',
//           "substancename": "RGA1608-05",
//           "substancepid": "urn:ghsts:9A5C394B-872E-433B-A391-00899F06613E",
//           "substanceidentifier": [
//             {
//               "TYPE_NAME": "GHSTS.GHSTS.SUBSTANCES.SUBSTANCE.SUBSTANCEIDENTIFIER",
//               "substanceidentifiertype":'bbb',
//               "identifier": "616890-34-1"
//             },
//             {
//               "TYPE_NAME": "GHSTS.GHSTS.SUBSTANCES.SUBSTANCE.SUBSTANCEIDENTIFIER",
//               "substanceidentifiertype": {
//                 "TYPE_NAME": "GHSTS.GHSTS.SUBSTANCES.SUBSTANCE.SUBSTANCEIDENTIFIER.SUBSTANCEIDENTIFIERTYPE",
//                 "value": {
//                   "TYPE_NAME": "GHSTS.EXTENSIONTYPESUBSTANCEIDENTIFIERTYPE",
//                   "value": "IUBMB"
//                 },
//                 "valuedecode": "IUBMB"
//               },
//               "identifier": "4467"
//             }
//           ]
//  }).then(ret => {
//    console.log(ret);
//  }).catch(err => {
//    console.log(err);
//  });

  // new testService().edb_get({}, true)
  //   .then(result => {
  //  console.log(result.data);
  // });
  // svr.edb_get({
  //   TYPE_NAME: 'EXTENSION_TYPE_ADMIN_NUMBER_TYPE', 
  //   value: 'AAAAAAAAAAAAAAAAA',
  //   valuedecode: 'AAAAAAAAAAAAAAAAA',
  //   isExt: true})
  //   .then(result => {
  //     console.log(result);
  //    svr.edb_delete(JSON. result);
  //   });
};

//Test request end

