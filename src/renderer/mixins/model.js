/**
 * @alexgagnon
 * This is the mixin to include generic information that can be used by all or
 * most entity screens that require a backing model. It uses Vuex to manage
 * it's data
 */

import {ModelService} from '@/services/model.service.js';
import {generatePID, getNestedProperty} from '@/services/utils.service.js';
import {cloneDeep} from 'lodash';
import {mapState} from 'vuex';

const model = {
  computed: {
    ...mapState(['loading']),
    ...mapState('app', {
      stateModel(state) {
        return state.currentRecord;
      },
      appRecords(state) {
        return state.appRecords;
      }
    }),
  },
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

    // creates a new empty model
    add(url) {
      this.$set(this, 'model', this.getEmptyModel(url));
    },

    // Reverts the current working model to what it is in vuex
    revert() {
      this.mapStateToModel();
    },

    // Save record in DB. If there is an _id prop, it's updating, if not it's a
    // new record
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

    // Creates a new clone of the selected record so we can modify without
    // commiting every change to vuex
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

    // What to display in the List Filter pane of the Master-Detail screens
    displayDefaultFilterListItem(obj) {
      return obj.valuedecode;
    },

    // A default display function for countries
    displayCountry(value) {
      return `(${value.value}) - ${value.valuedecode}`;
    },

    // A default display function for translations
    displayTranslation(value) {
      return this.$t(value);
    },

    // Updates the current page's state model
    select(item) {
      if (this.appRecords && this.appRecords.length) {
        this.$store.commit('app/updateCurrentRecord', item);
      }
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

    // Assigns generated PIDs to a a specific field
    assignPID(ref) {
      this.assignNestedValue(ref, generatePID());
    },

    // Adds a new item to tables via dialogs
    addItem(ref) {
      this.showDialog(ref);
    },

    // Shows a new dialog. There must be a dialog on the page with a ref of
    // 'dialog'. It's a promise, so will resolve with the modal object, or
    // reject with the error. NOTE: that to not have all the templates in
    // memory at once, this.getComponent is defined in each page with the modals
    // they need
    showDialog(ref, model, index) {
      const dialog = this.$refs['dialog'];
      const component = this.getComponent(ref);
      dialog.show({
        component,
        model: model ? cloneDeep(model) : null
      })
      .then(result => {
        if (index != null) this.$set(this.model[ref], index, result);
        else this.model[ref].push(result);
        dialog.close();
      })
      .catch(err => {
        console.log(err);
        dialog.close();
      });
    },

    // Handles table events
    handleAction(event, items) {
      switch(event.type) {
        case 'delete': {
          items.splice(event.index, 1);
          break;
        }
        case 'edit':
          console.log('handle edit');
          break;
        case 'view':
          console.log('handle view');
          break;
      }
    }
  }
};

export {model};
