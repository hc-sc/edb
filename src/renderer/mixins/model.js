/**
 * @alexgagnon
 * This is the mixin to include generic information that can be used by all or
 * most entity screens that require a backing model. It uses Vuex to manage
 * it's data
 */

import {ModelService} from '@/services/model.service.js';
import {generatePID, getNestedProperty} from '@/services/utils.service.js';
import {cloneDeep, merge, isEqual} from 'lodash';
import {mapState, mapMutations, mapActions} from 'vuex';
import {bus} from '@/plugins/plugin-event-bus.js';

const model = {
  data() {
    return {
      $dialog: null,
    };
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      currentRecord: state => state.app.currentRecord,
      currentUrl: state => state.app.currentUrl,
      records: state => state.app.records,
      submissionid: state => state.app.submissionid,
      dossierid: state => state.app.dossierid
    })
  },
  watch: {
    stateModel() {
      this.mapStateToModel();
    }
  },
  methods: {
    // pull these out so we can directly call them. Actions can be thennable
    ...mapMutations('app', ['updateCurrentRecord', 'updateCurrentUrl', 'updateAppRecords']),
    ...mapActions('app', ['updateAppData', 'createAppData', 'getAppDataAll']),

    // Returns a default empty model
    getEmptyModel(model) {
      return ModelService.getModel(model);
    },

    // required to deal with empty fields from the DB
    mergeModelAndRecord(model, record) {
      return merge(model, record);
    },

    // clears form for next node
    resetForm() {
      this.updateCurrentRecord(null);
      this.updateAppRecords([]);
    },

    // whether to paint the forms fields or not
    shouldShowFields() {
      return this.currentRecord != null;
    },

    // creates a new empty model
    add(model) {
      this.updateCurrentRecord(this.getEmptyModel(model));
      this.mapStateToModel();
    },

    // Reverts the current working model to what it is in vuex
    revert() {
      this.mapStateToModel();
    },

    // Save record in DB. If there is an _id prop, it's updating, if not it's a
    // new record
    save(url) {
      if (this.currentRecord == null) return;

      // need to delete the reactive observer for db insertion/update
      let sendModel = cloneDeep(this.model);
      delete sendModel.__ob__;
      if ('_id' in sendModel) {
        this.updateAppData({url, model: sendModel})
        .then(() => {
          this.showMessage(this.$t('UPDATE_SUCCESS'));
        })
        .catch(() => {
          this.showMessage(this.$t('UPDATE_FAILURE'));
        });
      }
      else {
        this.createAppData({url, model: sendModel})
        .then(record => {
          this.updateCurrentRecord(record);
          this.mapStateToModel();
          this.showMessage(this.$t('SAVE_SUCCESS'));
        })
        .then(() => this.getAppDataAll({url}))
        .catch(err => {
          console.error(err);
          this.showMessage(this.$t('SAVE_FAILURE'));
        });
      }
    },

    // Creates a new clone of the selected record so we can modify without
    // commiting every change to vuex
    mapStateToModel() {
      this.model = cloneDeep(this.currentRecord);
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
      return `${value.valuedecode} (${value.value})`;
    },

    // A default display function for translations
    displayTranslation(value) {
      return this.$t(value);
    },

    // Updates the current page's state model
    selectListItem(item, dirtyCheck = true) {
      if (this.records && this.records.length) {
        if (dirtyCheck && this.isDirty(this.currentRecord, this.model)) {
          this.showMessageDialog({message: this.$t('DISCARD_CHANGES')})
          .then(() => {
            this.updateCurrentRecord(merge(this.getEmptyModel(this.currentUrl), item));
            this.mapStateToModel();
          })
          .catch(err => console.error(err))
          .then(() => this.$dialog.close());
        }
        else {
          this.updateCurrentRecord(merge(this.getEmptyModel(this.currentUrl), item));
          this.mapStateToModel();
        }
      }
    },

    selectTableItem(componentName, model, index) {
      this.showFormDialog(componentName, merge(this.getEmptyModel(componentName), model), index)
      .then(result => {
        if (index != null) this.$set(this.model[componentName], index, result);
        else this.model[componentName].push(result);
      }, err => {
        console.err(err);
        this.showMessage(this.$t('ADD_ITEM_FAILURE'));
      })
      .catch(() => {

      })
      .then(() => {
        this.$dialog.close();
      });
    },

    isDirty(init, curr) {
      return !isEqual(init, curr);
    },

    // shows messages via the snackbar
    showMessage(message, confirm = true) {
      bus.$emit('addSnackbar', {message, confirm});
    },

    // Shows a new dialog. There must be a dialog on the page with a ref of
    // 'dialog'. It's a promise, so will resolve with the modal object, or
    // reject with the error. NOTE: this.getComponent MUST be  defined in each // page with the modals they need!
    showFormDialog(componentName, model, comp) {
      this.$dialog = this.$refs['dialog'];
      const component = comp ? comp : this.getComponent(componentName);
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
        console.log(ref, result);
        ref = getNestedProperty(this.model, ref);

        // if it's a duplicate, fail
        // need to for every item, check each non DB prop
        if (ref && Array.isArray(ref)) {
          let rowMatch = false;

          // row items, use 'result' and not 'item' since 'item' has DB fields
          for (let item of ref) {
            let propMatch = true;

            for (let prop of Object.keys(result)) {
              if (!isEqual(item[prop], result[prop])) {
                propMatch = false;
                break;
              }
            }
            if (propMatch) {
              rowMatch = true;
              break;
            }
          }

          if (rowMatch) {
            this.showMessage(this.$t('DUPLICATE_ITEM'));
          }
          else {
            ref.push(result);
          }
        }
      }, err => {
        console.error(err);
        this.showMessage(this.$t('ADD_ITEM_FAILURE'));
      })
      .catch(() => {

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
    // clean up records
    if(this.currentRecord != null && this.isDirty(this.currentRecord, this.model)) {
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
