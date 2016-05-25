'use strict';

var app = require('electron').app;
var ipc = require('electron').ipcMain;
var BrowserWindow = require('electron').BrowserWindow;

var mainWindow = null;

ipc.on('devTools', function (event, arg) {
    console.log(arg);
    mainWindow.openDevTools();
});

app.on('window-all-closed', function () {
        app.quit();
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 1730,
        height: 1000,
        show: false
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    
    // mainWindow.openDevTools();
    
    mainWindow.loadURL('file://' + __dirname + '/../renderer/index.html');
    mainWindow.webContents.on('did-finish-load', function () {
        // TODO: setTitle is being deprecated, find and use alternative
        mainWindow.setTitle("e-Dossier Builder (V0.1.0)");
        //if (configure.env.toString().toUpper() == 'DEV'){
            mainWindow.openDevTools();
        //}
    });
    mainWindow.show();
});