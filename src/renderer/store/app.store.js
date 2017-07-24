// import {BackendService} from '@/store/backend.service.js';

const app = {
  namespaced: true,

  state: {
    appRecords: [],
    model: {}
  },

  mutations: {
    updateModel(state, payload) {
      state.model = payload;
    },
    updateAppRecords(state, payload) {
      state.appRecords = payload;
    }
  }
};

export {app};