import {BackendService} from '@/store/backend.service.js';
import {sortByLocale} from '@/services/utils.service.js';


const app = {
  namespaced: true,

  state: {
    dossier: {},
    submission: {},
    Records: [],
    currentRecord: {},
    currentUrl: '',
  },

  getters: {
    submissions(state) {
      return state.dossier.submission;
    }
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
    updateCurrentDossier(state, dossier) {
      state.dossier = dossier;
    },
    updateCurrentSubmission(state, submission) {
      state.submission = submission;
    },
  },

  actions: {
    async getAppDataAll({commit}, {url, sortBy, desc = false}) {
      let records = await BackendService.getAppDataAll(url);
      if (sortBy != null) {
        records = sortByLocale(records.slice(), desc, sortBy);
      }
      commit('updateAppRecords', records);
    },

    async updateAppData({commit, dispatch}, {url, model}) {
      await BackendService.updateAppData(url, model);
      dispatch('getAppDataAll', {url})
      .then(commit('updateCurrentRecord', model));
    },

    async createAppData({commit, dispatch}, {url, model}) {
      await BackendService.createAppData(url, model);
      dispatch('getAppDataAll', {url});
    }
  }
};

export {app};