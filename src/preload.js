var _ipcRenderer = require('electron').ipcRenderer;

process.once('loaded', function () {
  (function (glob) {
    glob.ipcRenderer = _ipcRenderer;
  } (typeof window !== 'undefined' ? window : global));
});