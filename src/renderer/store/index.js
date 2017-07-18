import Vue from 'vue';
import Vuex from 'vuex';
import {BackendService} from './backend.service.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    loading: false,

    // currently selected dossier
    dossier: {
      id: 1,
      title: 'Dummy Title That is Really Long Oh God Why',
      status: ''
    },

    // currently selected submission
    submission: {
      id: 1,
      title: 'Dummy Submission',
      status: ''
    },

    picklists: [],

    // currently selected node for application wide and submission specific pages
    pageUrl: '',

    // the model for the current data
    model: {},
  },

  getters: {},

  mutations: {
    loading(state) {
      state.loading = true;
    },
    done(state) {
      state.loading = false;
    },
    updateCurrentDossier() {},
    updateCurrentSubmission() {},
    updatePageURL() {},
    updateFormData() {},
    updatePicklists(state, payload) {
      state.picklists = payload;
    },
    updateModel(state, payload) {
      state.model = payload;
    }
  },

  actions: {
    async getAll() {},
    async get() {},
    async create() {},
    async update() {},
    async delete() {},
    async search() {},
    async getPicklists({commit}) {
      let picklists = await BackendService.getPicklists();
      commit('updatePicklists', picklists);
    },
    getModel({commit}, model) {
      commit('updateModel', model);
    },
    async getDossier() {},
    async getAppData() {}
  }
});

export {store};
