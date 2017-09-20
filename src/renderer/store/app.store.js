import {BackendService} from '@/store/backend.service.js';
import {sortByLocale} from '@/services/utils.service.js';


const app = {
  namespaced: true,

  state: {
    appRecords: [],
    currentRecord: {},
    currentUrl: '',
    message: undefined,
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
    setMessage(state, message) {
      console.log(message);
      state.message = message;
      console.log(state);
    }
  },

  actions: {
    notify({commit}, message) {
      commit('setMessage', message);
      // setTimeout(() => {
      //   commit('setMessage', '');
      // }, 2000);
    },

    async getAppDataAll({commit}, {url, sortBy, desc = false}) {
      let records = await BackendService.getAppDataAll(url);
      if (sortBy != null) {
        records = sortByLocale(records.slice(), desc, sortBy);
      }
      commit('updateAppRecords', records);
    },

    async updateAppData({dispatch}, {url, model}) {
      await BackendService.updateAppData(url, model);
      dispatch('getAppDataAll', url);
    },

    async createAppData({commit, dispatch}, {url, model}) {
      await BackendService.createAppData(url, model);
      dispatch('getAppDataAll', url);
    }
  }
};

export {app};