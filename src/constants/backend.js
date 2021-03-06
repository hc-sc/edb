const BACKEND_CONSTANTS = {
  DATA_DIR: 'data',
  PRODUCTS_DIR: 'projects',

  APP_LEVEL_SERVICE: 'app',
  PRODUCT_DOSSIER_FOLDER_CONTACT_SYMBOL: '____',
  ACTIVE_ITEM_STATE_NAME: 'active',
  DEACTIVE_ITEM_STATE_NAME: 'deactive',
  GHSTS_XML_FILENAME: 'ghsts.xml',
  BASE_DIR1: 'resources',
  BASE_DIR2: 'app',
  TEMPLATE_DIR_NAME: 'templates',
  STANDARD_DIR_NAME: 'standards',
  VIEWER_UTIL_DIR_NAME: 'viewers',
  VIEWER_EXEC_DIR_NAME: 'desktop-viewer',
  VIEWER_CONF_DIR_NAME: 'config',
  VIEWER_CONF_FILE_NAME: 'app.data',
  DEF_SUB_DIR_NAME: 'jsondefinitions',
  DEFAULT_GHSTS_VERSION: '',
  HTML5_METHODS: ['get', 'put', 'post', 'delete'],
  FILE_CONF_DIR_NAME: 'confidential',
  FILE_CONT_DIR_NAME: 'content',
  FILE_MAIN_DIR_NAME: 'main',
  FILE_ATTAC_DIR_NAME: 'attachments',

  ID_PREFIX: {
    'document': 'DC',
    'dossier': 'DS',
    'file': 'FL',
    'legalentity': 'LE',
    'product': 'PD',
    'receiver': 'RE',
    'sender': 'SE',
    'submission': 'SM',
    'substance': 'SS',
    'toc': 'TC'
  }
};

module.exports = BACKEND_CONSTANTS;