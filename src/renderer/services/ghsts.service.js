import angular from 'angular';

import { GHSTS_MSG_CHANNEL, GHSTS_NG_MODULE_NAME, GHSTS_NG_SERVICE_ID, GHSTS_NG_SERVICE_URL, EDB_IPC_ASYNC_REPLAY_SUF} from '../../constants/shared';

import BaseService from './base.service';

export class GhstsService extends BaseService {
  constructor($q) {
    super($q, GHSTS_MSG_CHANNEL);
  }

  edb_openViewer(obj) {
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
      window.ipcRenderer.send(this.msgChannel, this._msg_envelope('openViewer', obj, timestamp));
    } else {
      deffer.reject('Error: Please run application in electron!');
    }
    return deffer.promise; 
  }

  edb_package() {
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
      window.ipcRenderer.send(this.msgChannel, this._msg_envelope('package', undefined, timestamp));
    } else {
      deffer.reject('Error: Please run application in electron!');
    }
    return deffer.promise; 
  }

  edb_validation() {
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
      window.ipcRenderer.send(this.msgChannel, this._msg_envelope('validation', undefined, timestamp));
    } else {
      deffer.reject('Error: Please run application in electron!');
    }
    return deffer.promise; 
  }

  static ghstsFactory(q) {
    return new GhstsService(q);
  }  
}

angular.module(GHSTS_NG_MODULE_NAME, [])
  .factory(GHSTS_NG_SERVICE_ID, ['$q', function ($q) {
    let q = $q;
    this.getService = function () {
      return GhstsService.ghstsFactory(q);
    };

    return {
      getService: this.getService
    };
  }]);

export default GHSTS_NG_MODULE_NAME;