import Vue from 'vue';
import Vuex from 'vuex';
import {picklists} from './picklists.store.js';
import {ghsts} from './ghsts.store.js';
import {app} from './app.store.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    picklists,
    ghsts,
    app
  }
});

export {store};
