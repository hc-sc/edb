/**
 * @alexgagnon
 * This is the mixin to include generic information that can be used by all or
 * most entity screens that require a backing model. It uses Vuex to manage
 * it's data
 */

import {ModelService} from '@/services/model.service.js';
import {generatePID, getNestedProperty} from '@/services/utils.service.js';
import {cloneDeep, merge, isEqual} from 'lodash';
import {mapState} from 'vuex';
import {bus} from '@/plugins/plugin-event-bus.js';

const model = {
  data() {
    return {
      $dialog: null
    };
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      stateModel: state => state.app.currentRecord,
      appRecords: state => state.app.appRecords
    })
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

    // required to deal with empty fields from the DB
    mergeModelAndRecord(model, record) {
      return merge(model, record);
    },

    // creates a new empty model
    add(model) {
      this.$set(this, 'model', this.getEmptyModel(model));
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
        this.$store.dispatch('app/updateAppData', {url, model: sendModel})
        .then(() => bus.$emit('addSnackbar', {message: this.$t('UPDATE_SUCCESS')}))
        .catch(() => bus.$emit('addSnackbar', {message: this.$t('UPDATE_FAILURE')}));
      }
      else {
        this.$store.dispatch('app/createAppData', {url, model: sendModel})
        .then(() => bus.$emit('addSnackbar', {message: this.$t('SAVE_SUCCESS')}))
        .catch(() => bus.$emit('addSnackbar', {message: this.$t('SAVE_FAILURE')}));
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

    matchBy(propName) {
      return (options, value) => {
        return options.findIndex(o => {
          return o[propName] === value;
        });
      };
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
    selectListItem(item, dirtyCheck = true) {
      if (this.appRecords && this.appRecords.length) {
        if (dirtyCheck && this.isDirty(this.stateModel, this.model)) {
          this.showMessageDialog({message: this.$t('DISCARD_CHANGES')})
          .then(() => {
            this.$store.commit('app/updateCurrentRecord', merge(this.getEmptyModel(this.modelName), item));
          })
          .catch(() => {return;})
          .then(() => this.$dialog.close());
        }
        else {
          this.$store.commit('app/updateCurrentRecord', merge(this.getEmptyModel(this.modelName), item));
        }
      }
    },

    selectTableItem(componentName, model, index) {
      this.showFormDialog(componentName, merge(this.getEmptyModel(componentName), model), index)
      .then(result => {
        if (index != null) this.$set(this.model[componentName], index, result);
        else this.model[componentName].push(result);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.$dialog.close();
      });
    },

    isDirty(init, curr) {
      return !isEqual(init, curr);
    },

    // Shows a new dialog. There must be a dialog on the page with a ref of
    // 'dialog'. It's a promise, so will resolve with the modal object, or
    // reject with the error. NOTE: this.getComponent is defined in each page // with the modals they need
    showFormDialog(componentName, model) {
      this.$dialog = this.$refs['dialog'];
      const component = this.getComponent(componentName);
      return this.$dialog.show({
        component,
        model: model ? cloneDeep(model) : null
      });
    },

    showMessageDialog({message}) {
      this.$dialog = this.$refs['dialog'];
      return this.$dialog.show({message});
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
      this.showFormDialog(ref)
      .then(result => {
        this.model[ref].push(result);
      })
      .catch(() => {
        this.$snackbar.show({message: this.$t('ADD_ITEM_FAILURE')});
      })
      .then(() => {
        this.$dialog.close();
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
  },

  // Make sure to clean up before leaving, and prompt user if
  // unsaved changes
  beforeRouteLeave(to, from, next) {
    if(this.isDirty(this.stateModel, this.model)) {
      this.showMessageDialog({message: this.$t('DISCARD_CHANGES')})
      .then(() => {
        next();
      })
      .catch(() => {
        console.error('Error changing routes');
      })
      .then(() => {
        this.$dialog.close();
      });
    }
    else {
      next();
    }
  }
};

export {model};
