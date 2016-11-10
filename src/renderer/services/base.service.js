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
      window.ipcRenderer.once(this.msgChannel + EDB_IPC_ASYNC_REPLAY_SUF, (event, arg) => {
        if (arg.err) {
          deffer.reject(arg.err);
        } else {
          deffer.resolve(this.jsonClassfer(arg));
        }
      });
      window.ipcRenderer.send(this.msgChannel, this._msg_envelope('get', obj));
    } else {
      deffer.reject('Error: Please run application in electron!');
    }
    return deffer.promise; 
  }

  edb_getSync(obj) {
    let retVal = window.ipcRenderer.sendSync(this.msgChannel + EDB_IPC_SYNC_SUF, this._msg_envelope('get', obj));
    if (retVal.err) {
      return retVal;
    } else {
      return this.jsonClassfer(retVal);
    }
  }

  edb_put(obj) {
    let deffer = this.$q.defer();
    if (window.ipcRenderer) {
      window.ipcRenderer.once(this.msgChannel + EDB_IPC_ASYNC_REPLAY_SUF, (event, arg) => {
        if (arg.err) {
          deffer.reject(arg.err);
        } else {
          deffer.resolve(this.jsonClassfer(arg));
        }
      });
      window.ipcRenderer.send(this.msgChannel, this._msg_envelope('put', obj));
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
      window.ipcRenderer.once(this.msgChannel + EDB_IPC_ASYNC_REPLAY_SUF, (event, arg) => {
        if (arg.err) {
          deffer.reject(arg.err);
        } else {
          deffer.resolve(this.jsonClassfer(arg));
        }
      });
      window.ipcRenderer.send(this.msgChannel, this._msg_envelope('post', obj));
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
      window.ipcRenderer.once(this.msgChannel + EDB_IPC_ASYNC_REPLAY_SUF, (event, arg) => {
        if (arg.err) {
          deffer.reject(arg.err);
        } else {
          deffer.resolve(this.jsonClassfer(arg));
        }
      });
      window.ipcRenderer.send(this.msgChannel, this._msg_envelope('delete', obj));
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
  _msg_envelope(method, obj) {
    let retVal = {};
    retVal.url = this.url ? this.url : '';
    if (obj) {
      if (obj.url) {
        retVal.url += retVal.url ? '/' : '' + obj.url;
      }
    }
    retVal.method = method;
    retVal.data = obj;
    return retVal; 
  }
}
