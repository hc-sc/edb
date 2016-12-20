import { EDB_IPC_SYNC_SUF, EDB_IPC_ASYNC_REPLAY_SUF } from '../../constants/shared';

export default class BaseService {
  constructor($q, msgChannel, url) {
    this.$q = $q;
    this.msgChannel = msgChannel;
    this.url = url;
  }

  edb_get(obj) {
    let deffer = this.$q.defer();
    if (window.ipcRenderer) {
      let timestamp = performance.now().toString();
      window.ipcRenderer.once(this.msgChannel + EDB_IPC_ASYNC_REPLAY_SUF + timestamp, (event, arg) => {
        if (arg.err) {
          deffer.reject(arg.err);
        } else {
          deffer.resolve(this.jsonClassfer(arg));
        }
      });
      window.ipcRenderer.send(this.msgChannel, this._msg_envelope('get', obj, timestamp));
    } else {
      deffer.reject('Error: Please run application in electron!');
    }
    return deffer.promise;
  }

  edb_getSync(obj) {
    if (window.ipcRenderer) {
      let retVal = window.ipcRenderer.sendSync(this.msgChannel + EDB_IPC_SYNC_SUF, this._msg_envelope('get', obj));
      if (retVal.err) {
        return retVal;
      } else {
        return this.jsonClassfer(retVal);
      }
    }
  }

  edb_put(obj) {
    let deffer = this.$q.defer();
    if (window.ipcRenderer) {
      let timestamp = performance.now().toString();
      window.ipcRenderer.once(this.msgChannel + EDB_IPC_ASYNC_REPLAY_SUF + timestamp, (event, arg) => {
        if (arg.err) {
          deffer.reject(arg.err);
        } else {
          deffer.resolve(this.jsonClassfer(arg));
        }
      });
      window.ipcRenderer.send(this.msgChannel, this._msg_envelope('put', obj, timestamp));
    } else {
      deffer.reject('Error: Please run application in electron!');
    }
    return deffer.promise;
  }

  edb_putSync(obj) {
    let retVal = window.ipcRenderer.sendSync(this.msgChannel + EDB_IPC_SYNC_SUF, this._msg_envelope('put', obj));
    if (retVal.err) {
      return retVal;
    } else {
      return this.jsonClassfer(retVal);
    }
  }

  edb_post(obj) {
    let deffer = this.$q.defer();
    if (window.ipcRenderer) {
      let timestamp = performance.now().toString();
      window.ipcRenderer.once(this.msgChannel + EDB_IPC_ASYNC_REPLAY_SUF + timestamp, (event, arg) => {
        if (arg.err) {
          deffer.reject(arg.err);
        } else {
          deffer.resolve(this.jsonClassfer(arg));
        }
      });
      window.ipcRenderer.send(this.msgChannel, this._msg_envelope('post', obj, timestamp));
    } else {
      deffer.reject('Error: Please run application in electron!');
    }
    return deffer.promise;
  }

  edb_postSync(obj) {
    let retVal = window.ipcRenderer.sendSync(this.msgChannel, this._msg_envelope('post', obj));
    if (retVal.err) {
      return retVal;
    } else {
      return this.jsonClassfer(retVal);
    }
  }

  edb_delete(obj) {
    let deffer = this.$q.defer();
    if (window.ipcRenderer) {
      let timestamp = performance.now().toString();
      window.ipcRenderer.once(this.msgChannel + EDB_IPC_ASYNC_REPLAY_SUF + timestamp, (event, arg) => {
        if (arg.err) {
          deffer.reject(arg.err);
        } else {
          deffer.resolve(this.jsonClassfer(arg));
        }
      });
      window.ipcRenderer.send(this.msgChannel, this._msg_envelope('delete', obj, timestamp));
    } else {
      deffer.reject('Error: Please run application in electron!');
    }
    return deffer.promise;
  }

  edb_deleteSync(obj) {
    let retVal = window.ipcRenderer.sendSync(this.msgChannel + EDB_IPC_SYNC_SUF, this._msg_envelope('delete', obj));
    if (retVal.err) {
      return retVal;
    } else {
      return this.jsonClassfer(retVal);
    }
  }

  jsonClassfer(obj) {
    return obj;
  }
//call back handles returned object
//the returned object structure {url:null,method:null,data:object}
  _msg_envelope(method, obj, timestamp) {
    let retVal = {};
    retVal.method = obj && obj.method ? obj.method : method;
    if (obj) {
      retVal.url = obj.url ? obj.url : obj._url;
      retVal.data = obj.data ? obj.data : obj;
    }
    retVal.timestamp = timestamp;
    return retVal;
  }
}
