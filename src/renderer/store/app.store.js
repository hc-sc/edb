// import {BackendService} from '@/store/backend.service.js';

const app = {
  namespaced: true,

  state: {
    appRecords: [],
    model: {},
    projectUrl: ''
  },

  mutations: {
    updateModel(state, payload) {
      state.model = payload;
    },
    updateAppRecords(state, payload) {
      state.appRecords = payload;
    },
    updateProjectUrl(state, payload) {
      state.projectUrl = payload;
    }
  },

  actions: {
    setProjectUrl({commit}, payload) {
      // if (await BackendService.updateProjectUrl) {
      commit('updateProjectUrl', payload);
      // }
    }
  }
};

export {app};