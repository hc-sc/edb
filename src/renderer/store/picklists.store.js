import {BackendService} from '@/store/backend.service.js';

const picklists = {
  namespaced: true,

  state: {
    picklists: []
  },

  getters: {
    adminnumber(state) {return state.picklists.filter(p => p.TYPE_NAME === 'EXTENSION_TYPE_ADMIN_NUMBER');},

    applicationtype(state) {return state.picklists.filter(p => p.TYPE_NAME === 'EXTENSION_TYPE_APPLICATION_TYPE');},

    country(state) {return state.picklists.filter(p => p.TYPE_NAME === 'EXTENSION_TYPE_COUNTRY');},

    dataprotuction(state) {return state.picklists.filter(p => p.TYPE_NAME === 'TYPE_DATA_PROTECTION');},

    datarequirement(state) {return state.picklists.filter(p => p.TYPE_NAME === 'TYPE_DATA_REQUIREMENT');},

    documentnumbertype(state) {return state.picklists.filter(p => p.TYPE_NAME === 'EXTENSION_TYPE_DOCUMENT_NUMBER_TYPE');},

    filetype(state) {return state.picklists.filter(p => p.TYPE_NAME === 'TYPE_FILE_TYPE');},

    formulationtype(state) {return state.picklists.filter(p => p.TYPE_NAME === 'EXTENSION_TYPE_FORMULATION_TYPE');},

    legalentityidentifiertype(state) {return state.picklists.filter(p => p.TYPE_NAME === 'EXTENSION_TYPE_LEGALENTITY_IDENTIFIER_TYPE');},

    legalentitytype(state) {return state.picklists.filter(p => p.TYPE_NAME === 'EXTENSION_TYPE_LEGALENTITY_TYPE');},

    metadatastatus(state) {return state.picklists.filter(p => p.TYPE_NAME === 'TYPE_METADATA_STATUS');},

    nodeassignmentstatus(state) {return state.picklists.filter(p => p.TYPE_NAME === 'TYPE_NODE_ASSIGNMENT_STATUS');},

    radocumentnumbertype(state) {return state.picklists.filter(p => p.TYPE_NAME === 'EXTENSION_TYPE_RA_DOCUMENT_NUMBER_TYPE');},

    referencetype(state) {return state.picklists.filter(p => p.TYPE_NAME === 'TYPE_REFERENCE_TYPE');},

    regulatorytype(state) {return state.picklists.filter(p => p.TYPE_NAME === 'EXTENSION_TYPE_REGULATORY_TYPE');},

    substanceidentifiertype(state) {return state.picklists.filter(p => p.TYPE_NAME === 'EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE');},

    tocowner(state) {return state.picklists.filter(p => p.TYPE_NAME === 'EXTENSION_TYPE_TOC_OWNER');},

    unit(state) {return state.picklists.filter(p => p.TYPE_NAME === 'EXTENSION_TYPE_UNIT');},
  },

  mutations: {
    updatePicklists(state, payload) {
      state.picklists = payload;
    }
  },

  actions: {
    async getPicklists({commit}) {
      commit('updatePicklists', await BackendService.getPicklists());
    }
  }
};

export {picklists};