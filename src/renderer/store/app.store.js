import {BackendService} from '@/store/backend.service.js';

const app = {
  namespaced: true,

  state: {
    appRecords: [],
    currentRecord: {},
    projectUrl: '',

    // used for knowing whether you can navigate back/forwards
    numStates: 1,
    currState: 1
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
    },
    updateNumStates(state, numStates) {
      state.numStates = numStates;
    },
    increaseCurrState(state) {
      if (state.numStates === state.currState) {
        ++state.numStates;
      }
      ++state.currState;
    },
    decreaseCurrState(state) {
      if (state.currState > 0) --state.currState;
    }
  },

  actions: {
    async setProjectUrl({commit}, payload) {
      commit('updateProjectUrl', payload);
    },

    async getAppDataAll({commit}, url) {
      try {
        let appData = await BackendService.getAppDataAll(url);
        commit('updateAppRecords', appData);
      }
      catch(err) {
        console.error('Could not fetch data');
      }
    },

    async updateAppData({dispatch}, {url, model}) {
      try {
        await BackendService.updateAppData(url, model);
        dispatch('getAppDataAll', url);
      }
      catch(err) {
        console.error('Could not update data');
      }
    }
  }
};

export {app};