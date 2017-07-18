import BackendService from '@/services/backend.service.js';
import {cloneDeep} from 'lodash';

const model = {
  // initialize
  watch: {
    stateModel() {
      this.mapStateToLocalModel();
    }
  },
  methods: {
    mapStateToLocaleModel() {
      this.model = cloneDeep(this.stateModel);
    },

    getModel() {

    }
  }
};

export {model};
