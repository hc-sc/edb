import {ipcRenderer as ipc} from 'electron';

const BackendService = {
  getAll: function() {
    return handleIPC('getAll', {});
  },

  get: function(id) {
    return handleIPC('get', {id});
  },

  delete: function(id) {
    return handleIPC('delete', {id});
  },

  create: function(name) {
    return handleIPC('create', {name});
  },

  update: function(hero) {
    return handleIPC('update', {hero});
  },

  search: function(term) {
    return handleIPC('search', term);
  },

  getPicklists: function() {
    return handleIPC('getAll', {url: 'picklists'});
  }
};

function handleIPC(method, query) {
  ipc.send(method, query);
  return new Promise((resolve) => {
    ipc.once(method, (event, args) => {
      if (args.err) handleError(args.err);
      else if (args.data) resolve(args.data);
      else resolve(200);
    });
  });
}

function handleError(error) {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
}

export {BackendService};
