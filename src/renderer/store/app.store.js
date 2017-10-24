import {BackendService} from '@/store/backend.service.js';
import {sortByLocale} from '@/services/utils.service.js';


const app = {
  namespaced: true,

  state: {
    // these are dossier level data
    dossiertitle: '', // the dossiers title
    dossierid: '',
    submissionid: '',
    ghsts: {}, // the dossier/submission metadata, via getGhsts
    isSubmission: false, // determines if we are in dossier management
    // these are used by all node screens
    records: [], // used for any master/detail screen (i.e. legalentities)
    currentRecord: null, // the currently selected record, which is cloned and used for revert and dirty check
    currentUrl: '', // used to set the current pages table
  },

  getters: {
    receivers(state) {
      return state.ghsts._receiver;
    },
    senders(state, getters) {
      return id => {
        return getters.receivers.find(receiver => receiver._id === id);
      };
    },
    dossier(state) {
      return state.ghsts._dossier;
    },
    product(state) {
      return state.ghsts._product;
    },
    files(state) {
      return state.ghsts._files;
    },
    documents(state) {
      return state.ghsts._documents;
    },
    toc(state) {
      return state.ghsts._toc;
    },
    tocdescription(state) {
      return state.ghsts._tocdescription;
    },
    isSubmission(state) {
      return state.isSubmission;
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
    updateCurrentGhsts(state, ghsts) {
      state.ghsts = ghsts;
    },
    updateCurrentSubmissionId(state, id) {
      state.submissionid = id;
    },
    updateDossierData(state, {dossiertitle, dossierid}) {
      state.dossiertitle = dossiertitle;
      state.dossierid = dossierid;
    },
    addReceiver(state, receiver) {
      state.ghsts._receiver.push(receiver);
    },
    addSender(state, {receiver, sender}) {
      let rec = state.ghsts._receiver.find(r => r._id === receiver._id);
      rec.push(sender);
    },
    setSubmissionState(state, value) {
      state.isSubmission = value;
    }
  },

  // don't try/catch these so we can .catch them where they are used
  actions: {
    async getAppDataAll({commit}, {url, sortBy, desc = false}) {
      let records = await BackendService.getAppDataAll(url);
      if (sortBy != null) {
        records = sortByLocale(records.slice(), desc, sortBy);
      }
      commit('updateAppRecords', records);
    },

    async getSubmissionDataAll({commit}, {url, dossierid, sortBy, desc = false}) {
      let records = await BackendService.callMethod(url, 'get', {_dossier: dossierid});
      if (sortBy != null) {
        records = sortByLocale(records.slice(), desc, sortBy);
      }
      commit('updateAppRecords', records);
    },

    async updateAppData({commit, dispatch}, {url, model}) {
      return await BackendService.updateAppData(url, model);

      // await BackendService.updateAppData(url, model);
      // dispatch('getAppDataAll', {url})
      // .then(() => commit('updateCurrentRecord', model));
    },

    async createAppData({commit, dispatch}, {url, model}) {
      return await BackendService.createAppData(url, model);
    },

    async updateCurrentGhsts({commit}, ghsts) {
      commit('updateCurrentGhsts', await BackendService.updateGhsts(ghsts));
    }
  }
};

export {app};