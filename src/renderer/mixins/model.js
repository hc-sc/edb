import {cloneDeep} from 'lodash';

const model = {
  // initialize
  watch: {
    stateModel() {
      this.mapStateToLocalModel();
    }
  },
  methods: {
    revert() {
      this.mapStateToLocaleModel();
    },
    mapStateToLocaleModel() {
      this.model = cloneDeep(this.stateModel);
    }
  }
};

export {model};
