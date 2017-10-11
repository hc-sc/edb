import {BackendService} from '@/store/backend.service.js';
import {sortByLocale} from '@/services/utils.service.js';


const app = {
  namespaced: true,

  state: {
    // these are dossier level data
    dossiertitle: '', // the dossiers title
    dossierid: '',
    submissionid: '',
    submission: {}, // the dossier/submission metadata, via getGhsts

    // these are used by all node screens
    records: [], // used for any master/detail screen (i.e. legalentities)
    currentRecord: null, // the currently selected record, which is cloned and used for revert and dirty check
    currentUrl: '', // used to set the current pages table
  },

  getters: {
    receivers(state) {
      return state.submission._receiver;
    },
    senders(state, getters) {
      return id => {
        return getters.receivers.find(receiver => receiver._id === id);
      };
    },
    dossier(state) {
      return state.submission._dossier;
    },
    product(state) {
      return state.submission._product;
    },
    files(state) {
      return state.submission._files;
    },
    documents(state) {
      return state.submission._documents;
    },
    toc(state) {
      return state.submission._toc;
    },
    tocdescription(state) {
      return state.submission._tocdescription;
    }
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
    updateCurrentSubmission(state, submission) {
      state.submission = submission;
    },
    updateCurrentSubmissionId(state, id) {
      state.submissionid = id;
    },
    updateDossierData(state, {dossiertitle, dossierid}) {
      state.dossiertitle = dossiertitle;
      state.dossierid = dossierid;
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
    },

    // async updateSubmission({commit}, {url, model}) {
    //   let submission = await BackendService.updateGhsts({});
    //   commit('updateCurrentSubmission', submission);
    // }
  }
};

export {app};