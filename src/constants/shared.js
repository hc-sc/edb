const SHARED_CONSTANTS = {
  DATA_BASE_DIR: 'data',

  EDB_IPC_SYNC_SUF: '-sync',
  EDB_IPC_ASYNC_REPLAY_SUF: '-replay',

  PICKLIST_SERVICE_URL: 'picklist',
  PICKLIST_OTHER_VALUE: 'other',
  PICKLIST_MSG_CHANNEL: 'picklist',
  PICKLIST_NG_MODULE_NAME: 'app.service.picklist',
  PICKLIST_NG_SERVICE_ID: 'PicklistService',

  GHSTS_SERVICE_URL: 'ghsts',
  GHSTS_MSG_CHANNEL: 'ghsts',
  GHSTS_NG_MODULE_NAME: 'app.service.ghsts',
  GHSTS_NG_SERVICE_ID: 'GhstsService',

  APP_DATA_SERVICE_URL: 'appdata',
  APP_DATA_MSG_CHANNEL: 'appdata',
  APP_DATA_NG_MODULE_NAME: 'app.service.appdata',
  APP_DATA_NG_SERVICE_ID: 'AppDataService',
  
  DOSSIER_DATA_SERVICE_URL: 'dossierdata',
  DOSSIER_DATA_MSG_CHANNEL: 'dossierdata',
  DOSSIER_DATA_NG_MODULE_NAME: 'app.service.dossierdata',
  DOSSIER_DATA_NG_SERVICE_ID: 'DossierDataService'
  
};

(function (exports) {
  let keys = Object.keys(SHARED_CONSTANTS); 

  keys.map(key => {
    exports[key] = SHARED_CONSTANTS[key];
  });
})(typeof exports === 'undefined' ? this['SHARED_CONSTANTS'] = {} : exports);