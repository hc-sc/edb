import {BackendService} from '@/store/backend.service.js';

const app = {
  namespaced: true,

  state: {
    appRecords: [],
    currentRecord: {},
    currentUrl: '',
    message: undefined,
  },

  mutations: {
    updateCurrentRecord(state, record) {
      state.currentRecord = record;
    },
    updateAppRecords(state, payload) {
      state.appRecords = payload;
    },
    updateCurrentUrl(state, url) {
      state.currentUrl = url;
    },
    setMessage(state, message) {
      console.log(message);
      state.message = message;
      console.log(state);
    }
  },

  actions: {
    notify({commit}, message) {
      commit('setMessage', message);
      // setTimeout(() => {
      //   commit('setMessage', '');
      // }, 2000);
    },

    async getAppDataAll({commit}, url) {
      try {
        commit('updateAppRecords', await BackendService.getAppDataAll(url));
      }
      catch(err) {
        console.error('Could not fetch app data');
      }
    },

    async updateAppData({dispatch}, {url, model}) {
      try {
        await BackendService.updateAppData(url, model);
        dispatch('getAppDataAll', url);
      }
      catch(err) {
        console.error('Could not update app data');
      }
    },

    async createAppData({commit, dispatch}, {url, model}) {
      try {
        await BackendService.createAppData(url, model);
        dispatch('getAppDataAll', url);
      }
      catch(err) {
        console.log('Could not create new record');
      }
    }
  }
};

export {app};