const {resolve, join} = require('path');

const pathFromRoot = (...paths) => {
  return resolve(__dirname, '..', ...paths);
};

const TARGET = 'electron';
const APP_ENTRY = 'index.js';
const HTML_ENTRY = 'index.html';
const SRC_DIR = 'src';
const BUILD_DIR = 'build';
const DIST_DIR = 'dist';
const ASSETS_DIR = 'assets';
const TEST_DIR = 'test';
const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = 8080;

const APP_PATH = pathFromRoot(SRC_DIR, 'renderer', APP_ENTRY);
const HTML_PATH = pathFromRoot(SRC_DIR, 'renderer', HTML_ENTRY);
const SRC_PATH = pathFromRoot(SRC_DIR, 'renderer');
const BUILD_PATH = pathFromRoot(BUILD_DIR);
const DIST_PATH = pathFromRoot(DIST_DIR);
const ASSETS_PATH_REL = join(ASSETS_DIR);
const SRC_ASSETS_PATH = join(SRC_PATH, ASSETS_PATH_REL);
const DIST_ASSETS_PATH = join(DIST_PATH, ASSETS_PATH_REL);
const TEST_PATH = pathFromRoot(TEST_DIR);
const CONFIG_PATH = __dirname;

const URL_LOADER_LIMIT = 10000;
const SOURCE_MAPS = true;

module.exports = {
  pathFromRoot,
  TARGET,
  APP_ENTRY,
  HTML_ENTRY,
  SRC_DIR,
  BUILD_PATH,
  DIST_DIR,
  ASSETS_DIR,
  TEST_DIR,
  PROTOCOL,
  HOST,
  PORT,
  APP_PATH,
  HTML_PATH,
  SRC_PATH,
  DIST_PATH,
  ASSETS_PATH_REL,
  SRC_ASSETS_PATH,
  DIST_ASSETS_PATH,
  TEST_PATH,
  CONFIG_PATH,
  URL_LOADER_LIMIT,
  SOURCE_MAPS
};
