import {cloneDeep} from 'lodash';

const model = {
  watch: {
    stateModel() {
      this.mapStateToModel();
    }
  },
  methods: {
    revert() {
      this.mapStateToModel();
    },
    mapStateToModel() {
      this.model = cloneDeep(this.stateModel);
    }
  }
};

export {model};
