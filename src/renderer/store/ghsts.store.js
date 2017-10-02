import {BackendService} from '@/store/backend.service.js';

const ghsts = {
  namespaced: true,

  state: {
    dossier: null,
    submission: null,
  },

  getters: {
    submissions(state) {
      return state.dossier.submission;
    }
  },

  mutations: {
    updateCurrentDossier(state, dossier) {
      console.log(dossier);
      state.dossier = dossier;
    },
    updateCurrentSubmission(state, submission) {
      state.submission = submission;
    },
  }
};

export {ghsts};