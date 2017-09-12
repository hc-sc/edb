import {ModelService} from '@/services/model.service.js';
import {generatePID, getNestedProperty} from '@/services/utils.service.js';
import {cloneDeep} from 'lodash';

const model = {
  watch: {
    stateModel() {
      this.mapStateToModel();
    }
  },
  methods: {
    // Returns a default empty model
    getEmptyModel(model) {
      return ModelService.getModel(model);
    },

    // Reverts the current working model to what it is in vuex
    revert() {
      this.mapStateToModel();
    },

    // Save record in DB. If there is an _id prop, it's updating, if not it's a new record
    save(url) {
      // need to delete the reactive observer for db insertion/update
      let sendModel = cloneDeep(this.model);
      delete sendModel.__ob__;
      if ('_id' in sendModel) {
        this.$store.dispatch('app/updateAppData', {url, model: sendModel});
      }
      else {
        this.$store.dispatch('app/createAppData', {url, model: sendModel});
      }
    },

    // Creates a new clone of the selected record so we can modify without commiting every change to vuex
    mapStateToModel() {
      this.model = cloneDeep(this.stateModel);
    },

    // Defines how to match items. Used in the Select component to match on IDs
    matchById(options, value) {
      return options.findIndex(o => {
        return o._id === value;
      });
    },

    // The default mechanism for displaying picklist items
    displayPicklistItem(value) {
      return value.valuedecode;
    },

    // Helper method for updating nested values
    assignNestedValue(ref, value) {
      let props = ref.split('.');
      let prop = props[props.length - 1];
      ref = props.slice(0, props.length - 1);
      if (ref && ref.length) {
        ref = getNestedProperty(this.model, ref);
      }
      this.$set(ref && ref.length ? ref : this.model, prop, value);
    },
    generatePID(ref) {
      this.assignNestedValue(ref, generatePID());
    }
  }
};

export {model};
