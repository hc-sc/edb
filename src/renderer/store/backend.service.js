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

  // returns all dossiers
  getGhstsAll: function () {
    return handleIPC(BACKENDCONST.GHSTS_MSG_CHANNEL, 'get');
  },

  // ************************
  //Paramater "obj"
  // ************************
  //
  // _id is for ghstsid
  //
  //For get ghsts
  //  _url: ['ghsts/'(optional)]'ghstsid'
  //
  //For get ghsts by submission id
  // _submissionid: the submission id
  //
  //For get receivers of the submission
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'receiver'
  //
  //For get documents of the dossier
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'document'
  //
  //For get files of the dossier
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'file'
  //
  //For get toc of the dossier
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'toc'
  //
  // ex: _url: '<ghsts/<ghstsid>>/toc'
  // ********************************************
  getGhsts: function (obj) {
    if (typeof obj === 'string')
      return handleIPC(BACKENDCONST.GHSTS_MSG_CHANNEL,'get', {_id: obj});
    else
      return handleIPC(BACKENDCONST.GHSTS_MSG_CHANNEL,'get', obj);
  },

  // ************************
  //Paramater "obj"
  // ************************
  //
  //For delete ghsts
  //  obj: (string) the ghsts id
  //
  //For delete submission
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'submission'
  //
  //For remove receivers from ghsts
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'receiver'
  //
  //For remove document from one toc node
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'toc'
  //  data: {
  //    tocnodepid: the toc node PID
  //    docid:      the document id
  //    }
  //  }
  // ********************************************
  deleteGhsts: function (obj) {
    if (typeof obj === 'string')
      return handleIPC(BACKENDCONST.GHSTS_MSG_CHANNEL, 'delete', {_id: obj});
    else
      return handleIPC(BACKENDCONST.GHSTS_MSG_CHANNEL, 'delete', obj);
  },

  // ************************
  //Paramater "obj"
  // ************************
  //
  //For create ghsts(submission 01)
  //  dossiertitle: the dossier title
  //  product:      the product id
  //  tocId:        the toc id
  //
  //For create ghsts(submission other than number 01)
  //  dossierid:    the dossier id
  //
  //For link receiver to ghsts
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'receiver/receiverid'
  //
  //For link sender to receiver
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'receiver/receiverid/sender/senderid'
  //
  //For create document at Dossier Screen
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'document'
  //  data: the new document object
  //
  //For create file at Dossier Screen
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'file'
  //  data: the new file object
  //
  //For add document to one toc node
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'toc'
  //  data: {
  //    tocnodepid: the toc node PID
  //    document: {
  //      _id:            the document id
  //      documenttitle:  the document title
  //    }
  //  }
  // ********************************************
  createGhsts: function (obj) {
    return handleIPC(BACKENDCONST.GHSTS_MSG_CHANNEL, 'post', obj);
  },

  // ************************
  //Paramater "obj"
  // ************************
  //Call ghsts 'put' to put the whole object
  //For update receiver
  //  the ghsts obj
  //
  //For update document at Dossier Screen
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'document'
  //  data: the new document object
  //
  //For update file at Dossier Screen
  //  _url: ['ghsts/'(optional)]['ghstsid/'(optional)]'file'
  //  data: the new file object
  //
  // ********************************************
  updateGhsts: function (obj) {
    return handleIPC(BACKENDCONST.GHSTS_MSG_CHANNEL, 'put', obj);
  },

  packageGhsts: function () {
    return handleIPC(BACKENDCONST.GHSTS_MSG_CHANNEL, 'package');
  },

  validateGhsts: function () {
    return handleIPC(BACKENDCONST.GHSTS_MSG_CHANNEL, 'validation');
  },
  openViewerGhsts: function (submissionid) {
    return handleIPC(BACKENDCONST.GHSTS_MSG_CHANNEL, 'openViewer', {submissionid});
  },

  searchGhsts: function (cont) {
    return handleIPC(BACKENDCONST.GHSTS_MSG_CHANNEL, 'get', {where: cont});
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

  callMethod: function(url, method, data) {
    return handleIPC(BACKENDCONST.APP_DATA_MSG_CHANNEL, method, {_url: url, data});
  }
};

function handleIPC(msgChannel, method, query) {
  return new Promise((res, rej) => {
    if (ipc) {
      let timestamp = _getTimeStamp();
      ipc.once(msgChannel + BACKENDCONST.EDB_IPC_ASYNC_REPLAY_SUF + timestamp, (event, args) => {
        console.log(args.err);
        if (args.err && args.err.code !== 'EDB30002') {
          rej(args.err);
        }
        // validation results!
        else if (args.err && args.err.code === 'EDB30002') {
          res(args.err.data);
        }
        else {
          try {
            res(JSON.parse(args.data));
          }
          catch(err) {
            res(args.data);
          }
        }
      });
      ipc.send(msgChannel, _msg_envelope(method, query, timestamp));
    } else {
      rej('Error: Please run application in electron!');
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

export {BackendService};
