import Vue from 'vue';
import Vuex from 'vuex';
import {picklists} from './picklists.store.js';
import {app} from './app.store.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    picklists,
    app
  },

  state: {
    // used for presenting loading screens
    loading: false,

    // used for knowing whether you can navigate back/forwards
    numStates: 1,
    currState: 1
  },

  mutations: {
    toggleLoading(state) {
      state.loading = !state.loading();
    },
    loading(state) {
      state.loading = true;
    },
    ready(state) {
      state.loading = false;
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
  }
});

export {store};
