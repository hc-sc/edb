
'use strict';

var path = require('path');
var app = require('electron').app;
var ipc = require('electron').ipcMain;
var BrowserWindow = require('electron').BrowserWindow;

var q = require('q');

var SHARED_CONST = require('./constants/shared');
var BACKEND_CONST = require('./constants/backend');

const PicklistService = require('./services/picklist.service');
const GhstsService = require('./services/ghsts.service');
const ServiceDispatcher = require('./services/service.dispatcher');
const RVHelper = require('./utils/return.value.helper');

var mainWindow = null;

var picklistInst = null;

var submissions = [];

var svrDisps = {};


ipc.on('devTools', function (event, arg) {
  console.log(arg);
  mainWindow.openDevTools();
});

ipc.on(SHARED_CONST.PICKLIST_MSG_CHANNEL, function (event, arg) {
  console.log(SHARED_CONST.PICKLIST_MSG_CHANNEL + ' - ' + arg);
  let svr = new PicklistService(q);
  let method = 'edb_' + arg.method;
  svr[method](arg.data).then(result => {
    event.sender.send(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, result);
  })
    .catch(err => {
      event.sender.send(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, err);
    });
});

ipc.on(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
  console.log(SHARED_CONST.PICKLIST_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF + ' - ' + arg);
  let svr = new PicklistService(q);
  let method = 'edb_' + arg.method + 'Sync';
  event.returnValue = svr[method](arg.data);
});

ipc.on(SHARED_CONST.GHSTS_MSG_CHANNEL, function (event, arg) {
  console.log(SHARED_CONST.GHSTS_MSG_CHANNEL + ' - ' + arg);
  let svr = new GhstsService(q, submissions);
  let method = 'edb_' + arg.method;
  svr[method](arg.data).then(result => {
    event.sender.send(SHARED_CONST.GHSTS_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, result);
  })
    .catch(err => {
      event.sender.send(SHARED_CONST.GHSTS_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, err);
    });
});

ipc.on(SHARED_CONST.GHSTS_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
  console.log(SHARED_CONST.GHSTS_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF + ' - ' + arg);
  //  let svr = new PicklistService(q);
  //  let method = 'edb_' + arg.method + 'Sync';
  //  event.returnValue = svr[method](arg.data);
  event.returnValue = new RVHelper('EDB00001');
});


ipc.on(SHARED_CONST.APP_DATA_MSG_CHANNEL, function (event, arg) {
  console.log(SHARED_CONST.APP_DATA_MSG_CHANNEL + ' - ' + arg);
  let svrDisp;
  if (!svrDisps[BACKEND_CONST.APP_LEVEL_SERVICE]) {
    svrDisps[BACKEND_CONST.APP_LEVEL_SERVICE] = svrDisp = new ServiceDispatcher(BACKEND_CONST.APP_LEVEL_SERVICE);
  } else {
    svrDisp = svrDisps[BACKEND_CONST.APP_LEVEL_SERVICE];
  }
  let svr = svrDisp.getService(q, arg.url);
  let method = 'edb_' + arg.method;
  svr[method](arg.data).then(result => {
    event.sender.send(SHARED_CONST.APP_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, result);
  })
    .catch(err => {
      event.sender.send(SHARED_CONST.APP_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, err);
    });
});

ipc.on(SHARED_CONST.APP_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
  console.log(SHARED_CONST.APP_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF + ' - ' + arg);
//  let svr = new PicklistService(q);
//  let method = 'edb_' + arg.method + 'Sync';
  event.returnValue = new RVHelper('EDB00001');
});


ipc.on(SHARED_CONST.DOSSIER_DATA_MSG_CHANNEL, function (event, arg) {
  console.log(SHARED_CONST.DOSSIER_DATA_MSG_CHANNEL + ' - ' + arg);
  let svrDisp;
  if (!svrDisps[BACKEND_CONST.DOSSIER_LEVEL_SERVICE]) {
    svrDisps[BACKEND_CONST.DOSSIER_LEVEL] = svrDisp = new ServiceDispatcher(BACKEND_CONST.DOSSIER_LEVEL);
  } else {
    svrDisp = svrDisps[BACKEND_CONST.DOSSIER_LEVEL];
  }
  let svr = svrDisp.getService(q, arg.url, true);
  let method = 'edb_' + arg.method;
  svr[method](arg.data).then(result => {
    event.sender.send(SHARED_CONST.DOSSIER_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, result);
  })
    .catch(err => {
      event.sender.send(SHARED_CONST.DOSSIER_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_ASYNC_REPLAY_SUF, err);
    });
});

ipc.on(SHARED_CONST.DOSSIER_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF, function (event, arg) {
  console.log(SHARED_CONST.DOSSIER_DATA_MSG_CHANNEL + SHARED_CONST.EDB_IPC_SYNC_SUF + ' - ' + arg);
//  let svr = new PicklistService(q);
//  let method = 'edb_' + arg.method + 'Sync';
  event.returnValue = new RVHelper('EDB00001');
});

app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', function () {
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

  if (!picklistInst) {
    let picklistSrv = new PicklistService(q);
    picklistSrv.initPicklistFromXSD().then(result => {
      picklistInst = result;
      console.log(picklistInst);
    });
  }

  mainWindow.loadURL('file://' + __dirname + '/../build/index.html');
  mainWindow.webContents.on('did-finish-load', function () {
    // TODO: setTitle is being deprecated, find and use alternative
    mainWindow.setTitle("e-Dossier Builder (V0.1.0)");
    //if (configure.env.toString().toUpper() == 'DEV'){
    mainWindow.openDevTools();
    //}
  });
  mainWindow.show();
});
