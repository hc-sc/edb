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
      // if (await BackendService.updateProjectUrl) {
      commit('updateProjectUrl', payload);
      // }
    },

    async getAppDataAll({commit}, payload) {
      commit('updateAppRecords', await BackendService.getAppDataAll(payload));
    },
  }
};

export {app};