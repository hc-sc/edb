import {ModelService} from '@/services/model.service.js';
import {cloneDeep} from 'lodash';

const model = {
  watch: {
    stateModel() {
      this.mapStateToModel();
    }
  },
  methods: {
    getEmptyModel(model) {
      return ModelService.getModel(model);
    },
    revert() {
      this.mapStateToModel();
    },
    async save(url) {
      await this.$store.dispatch('app/updateAppData', {url, model: this.model});
    },
    mapStateToModel() {
      this.model = cloneDeep(this.stateModel);
    },
    matchById(options, value) {
      return options.findIndex(o => {
        return o._id === value;
      });
    },
    displayPicklistItem(value) {
      return value.valuedecode;
    },
    // displayIdValue(list, id, valueProp) {
    //   return;
    // }
  }
};

export {model};
