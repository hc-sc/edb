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
      // save either updates an existing record, or creates a new one
      // existing records will have the '_id' field from the db
      if (this.model._id) {
        this.$store.dispatch('app/updateAppData', {url, model: this.model});
      }
      else {
        // need to delete the reactive observer for db insertion/update
        // let sendModel = cloneDeep(this.model);
        delete this.model.__ob__;
        await this.$store.dispatch('app/createAppData', {url, model: this.model});
      }
    },
    newPicklistItem(picklistItem) {
      this.$store.dispatch('picklists/newPicklistItem', picklistItem);
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
    generateNewPID() {

    }
  }
};

export {model};
