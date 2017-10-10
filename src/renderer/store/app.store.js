import {BackendService} from '@/store/backend.service.js';
import {sortByLocale} from '@/services/utils.service.js';


const app = {
  namespaced: true,

  state: {
    dossiertitle: '',
    dossierid: '',
    submissionid: '',
    submission: '',
    records: [],
    currentRecord: null,
    currentUrl: '',
  },

  mutations: {
    updateCurrentRecord(state, record) {
      state.currentRecord = record;
    },
    updateAppRecords(state, payload) {
      state.records = payload;
    },
    updateCurrentUrl(state, url) {
      state.currentUrl = url;
    },
    updateCurrentDossier(state, dossier) {
      state.dossierid = dossier;
    },
    updateCurrentSubmission(state, submission) {
      state.submission = submission;
    },
    updateCurrentSubmissionId(state, id) {
      state.submissionid = id;
    },
    updateDossierTitle(state, title) {
      state.dossiertitle = title;
    }
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
      .then(() => commit('updateCurrentRecord', model));
    },

    async createAppData({commit, dispatch}, {url, model}) {
      return await BackendService.createAppData(url, model);
    }
  }
};

export {app};