//import {ipcRenderer as ipc} from 'electron';
import * as BACKENDCONST from '../../constants/shared';

const ipc = window.ipcRenderer;

const BackendService = {
  getAppDataAll: function (url) {
    return handleIPC(BACKENDCONST.APP_DATA_MSG_CHANNEL, 'get', {_url: url});
  },

  getAppData: function (url, id) {
    return handleIPC(BACKENDCONST.APP_DATA_MSG_CHANNEL, 'get', {_url: url, data: {_id: id }});
  },

  deleteAppData: function (url, id) {
    return handleIPC(BACKENDCONST.APP_DATA_MSG_CHANNEL, 'delete', {_url: url, data: {_id: id }});
  },

  createAppData: function (url, obj) {
    return handleIPC(BACKENDCONST.APP_DATA_MSG_CHANNEL, 'post', { _url: url, data: obj });
  },

  updateAppData: function (url, obj) {
    return handleIPC(BACKENDCONST.APP_DATA_MSG_CHANNEL, 'put', {_url: url, data: obj});
  },

  searchAppData: function (url, term) {
    return handleIPC(BACKENDCONST.APP_DATA_MSG_CHANNEL, 'get', {_url: url, data: term});
  },

  getGhstsAll: function () {
    return handleIPC('getAll', {});
  },

  getGhsts: function (id) {
    return handleIPC('get', { id });
  },

  deleteGhsts: function (id) {
    return handleIPC('delete', { id });
  },

  createGhsts: function (name) {
    return handleIPC('create', { name });
  },

  updateGhsts: function (hero) {
    return handleIPC('update', { hero });
  },

  searchGhsts: function (term) {
    return handleIPC('search', term);
  },

  getPicklists: function () {
    return handleIPC(BACKENDCONST.PICKLIST_MSG_CHANNEL, 'get', {});
  },
  
  getPicklist: function (typeName) {
    return handleIPC(BACKENDCONST.PICKLIST_MSG_CHANNEL, 'get', typeName);
  },

  deletePicklist: function (id) {
    return handleIPC(BACKENDCONST.PICKLIST_MSG_CHANNEL, 'delete', { '_id': id });
  },

  createPicklist: function (obj) {
    return handleIPC(BACKENDCONST.PICKLIST_MSG_CHANNEL, 'post', obj);
  },

  updatePicklist: function (obj) {
    return handleIPC(BACKENDCONST.PICKLIST_MSG_CHANNEL, 'put', obj);
  },

  searchPicklist: function (cont) {
    return handleIPC(BACKENDCONST.PICKLIST_MSG_CHANNEL, 'get', {where: cont});
  },
  
};

function handleIPC(msgChannel, method, query) {
  return new Promise((res) => {
    if (ipc) {
      let timestamp = _getTimeStamp();
      ipc.once(msgChannel + BACKENDCONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, (event, args) => {
        if (args.err) {
          handleError(args.err);
        } else {
          res(JSON.parse(args.data));
        }
      });
      ipc.send(msgChannel, _msg_envelope(method, query, timestamp));
    } else {
      handleError('Error: Please run application in electron!');
    }
  });
}

function handleError(error) {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
}

function _getTimeStamp() {
  let retVal = performance.now().toString();
  let exiTimeStamp = window.curTimeStamp;
  if (!exiTimeStamp || (exiTimeStamp !== retVal)) {
    window.curTimeStamp = exiTimeStamp = retVal;
    window.curTick = 0;
  } else {
    window.curTick++;
    retVal = retVal + window.curTick.toString();
  }
  return retVal;
}

function _msg_envelope(method, obj, timestamp) {
  let retVal = {};
  retVal.method = (obj && obj.method) ? obj.method : method;
  if (obj) {
    retVal.url = obj.url ? obj.url : obj._url;
    retVal.data = obj.data ? obj.data : obj;
  }
  retVal.timestamp = timestamp;
  return retVal;
}

export { BackendService };
