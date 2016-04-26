'use strict';

var app = require('app');
var ipc = require('electron').ipcMain;
var BrowserWindow = require('electron').BrowserWindow;

var mainWindow = null;

ipc.on('devTools', function (event, arg) {
    mainWindow.openDevTools();
});

app.on('window-all-closed', function () {
        app.quit();
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        show: false
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    
    // mainWindow.openDevTools();
    
    mainWindow.loadURL('file://' + __dirname + '/../renderer/index.html');
    mainWindow.webContents.on('did-finish-load', function () {
        // mainWindow.setTitle(app.getName());
        mainWindow.setTitle("e-Dossier Builder (V0.1.0)");
    });
    mainWindow.show();
});