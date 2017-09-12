import {BackendService} from '@/store/backend.service.js';

const app = {
  namespaced: true,

  state: {
    appRecords: [],
    currentRecord: {},
    currentUrl: ''
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
    }
  },

  actions: {
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

    async createAppData({commit, dispatch}, {url}) {
      try {
        await BackendService.createAppData(url, {});
        dispatch('getAppDataAll');
      }
      catch(err) {
        console.log('Could not create new record');
      }
    }
  }
};

export {app};