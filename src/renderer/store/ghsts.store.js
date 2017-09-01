import {BackendService} from '@/store/backend.service.js';

const ghsts = {
  namespaced: true,

  state: {
    dossier: {},
    submission: {},
  },

  mutations: {
    updateCurrentDossier() {},
    updateCurrentSubmission() {},
  }
};

export {ghsts};