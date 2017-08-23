import {BackendService} from '@/store/backend.service.js';

const app = {
  namespaced: true,

  state: {
    appRecords: [],
    currentRecord: {},
    projectUrl: ''
  },

  mutations: {
    updateModel(state, payload) {
      state.currentRecord = payload;
    },
    updateAppRecords(state, payload) {
      state.appRecords = payload;
    },
    updateProjectUrl(state, payload) {
      state.projectUrl = payload;
    }
  },

  actions: {
    async setProjectUrl({commit}, payload) {
      commit('updateProjectUrl', payload);
    },

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
    }
  }
};

export {app};