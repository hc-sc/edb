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
    },
    matchById(options, value) {
      return options.findIndex(o => {
        return o._id === value;
      });
    }
  }
};

export {model};
