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
        let appData = await BackendService.getAppDataAll(url);
        commit('updateAppRecords', appData);
      }
      catch(err) {
        console.error('Could not fetch data');
      }
    },

    async updateAppData({dispatch}, {url, model}) {
      try {
        await BackendService.updateAppData(url, model);
        dispatch('getAppDataAll', url);
      }
      catch(err) {
        console.error('Could not update data');
      }
    },

    async newAppRecord({commit, dispatch}, {url}) {
      try {
        let record = await BackendService.createAppData(url, {});
        console.log(record);
        dispatch('getAppDataAll');
        commit('updateCurrentRecord', record);
      }
      catch(err) {
        console.log('Could not create new record');
      }
    }
  }
};

export {app};