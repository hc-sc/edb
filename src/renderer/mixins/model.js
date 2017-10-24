/**
 * @alexgagnon
 * This is the mixin to include generic information that can be used by all or
 * most entity screens that require a backing model. It uses Vuex to manage
 * it's data
 */

import {ModelService} from '@/services/model.service.js';
import {BackendService} from '@/store/backend.service.js';
import {generatePID, getNestedProperty, getValidPIDRegExp} from '@/services/utils.service.js';
import {cloneDeep, merge, isEqual} from 'lodash';
import {mapState, mapMutations, mapActions} from 'vuex';
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
      currentRecord: state => state.app.currentRecord,
      currentUrl: state => state.app.currentUrl,
      records: state => state.app.records,
      submissionid: state => state.app.submissionid,
      ghsts: state => state.app.ghsts,
      dossierid: state => state.app.dossierid,
      isSubmission: state => state.app.isSubmission
    })
  },

  methods: {
    // pull these out so we can directly call them. Actions are thennable
    ...mapMutations('app', ['updateCurrentRecord', 'updateCurrentUrl', 'updateAppRecords', 'setSubmissionState']),
    ...mapActions('app', [
      'updateAppData',
      'createAppData',
      'getAppDataAll',
      'getSubmissionDataAll'
    ]),

    getValidPIDRegExp,

    // Returns a default empty model
    getEmptyModel(model) {
      console.log(model);
      return ModelService.getModel(model);
    },

    // This takes an empty schema object and merges it with the record
    // We need to do this because the DB doesn't store fields that are
    // empty, but Vue needs to have the fields predefined or set to be reactive
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
      if (this.currentRecord != null && this.isDirty(this.currentRecord, this.model)) {
        this.showMessageDialog({message: this.$t('DISCARD_CHANGES')})
        .then(() => {
          this.updateCurrentRecord(this.getEmptyModel(model));
          this.mapStateToModel();
        })
        .catch(() => {
        })
        .then(() => {
          this.$dialog.close();
        });
      }
      else {
        this.updateCurrentRecord(this.getEmptyModel(model));
        this.mapStateToModel();
      }

      // autogenerate PIDs for appropriate models (product, dossier, etc.)
      this.autofillPID(model);
    },

    // Reverts the current working model to what it is in vuex
    revert() {
      this.mapStateToModel();
    },

    // Save record in DB
    // This depends on whether we are currently in a submission or not.
    // If its 'global' application data, we save to it's global URL. If it's
    // dossier specific data, and depending on the URL, we may need to update
    // the current GHSTS object, or the item in the table.
    // If the record is new (no '_id' field), then we need to create and
    // return a new entry, otherwise we update

    // NOTE: that 'file' is actually created during the selectFolder function,
    // so you actually 'update' rather than 'create' on the first save
    async save(url) {
      if (this.currentRecord == null) return;

      // need to delete the reactive observer for db insertion/update
      let model = cloneDeep(this.model);
      delete model.__ob__;

          // for items with their own table that are linked with a dossier
          // need to append the dossier id for table joins
      if (this.isSubmission && (url === 'file' || url === 'document' || url === 'dossier' )) {
        model._dossier = this.dossierid;
      }

      // updating an existing item
      if ('_id' in model) {
        if (this.isSubmission) {
          try {
            let result = await BackendService.updateAppData(url, model);
            this.updateCurrentRecord(result);
            if (url === 'file' || url === 'document') {
              // set records that match this dossier
              await this.getSubmissionDataAll({url, dossierid: this.dossierid});
            }
            this.mapStateToModel();
            this.showMessage(this.$t('UPDATE_SUCCESS'));
          }
          catch(err) {
            this.showMessage(this.$t('UPDATE_FAILURE'));
          }
        }

        // global app data update
        else {
          try {
            let result = await this.updateAppData({url, model});
            this.updateCurrentRecord(result);
            if (this.hasRecords(url)) {
              this.getAppDataAll({url});
            }
            this.mapStateToModel();
            this.showMessage(this.$t('UPDATE_SUCCESS'));
          }
          catch(err) {
            this.showMessage(this.$t('UPDATE_FAILURE'));
          }
        }
      }

      // else we need to create a new record
      else {
        // NOTE: if the model has a _dossierid field, it will be used to save
        // to correct table
        // if (this.isSubmission) {

        // }
        // else {

        // }
        this.createAppData({url, model})
        .then(record => {
          this.updateCurrentRecord(record);
          this.mapStateToModel();
          this.showMessage(this.$t('SAVE_SUCCESS'));
        })
        .then(async () => {
          if (this.hasRecords(url)) {
            await this.getAppDataAll({url});
          }
        })
        .catch(err => {
          this.showMessage(this.$t('SAVE_FAILURE'));
        });
      }
    },

    hasRecords(url) {
      return url === 'legalentity' ||
        url === 'sender' ||
        url === 'receiver' ||
        url === 'substance' ||
        (url === 'product' && !this.isSubmission) ||
        url === 'file' ||
        url === 'document';
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
    showFormDialog(componentName, model) {
      this.$dialog = this.$refs['dialog'];
      const component = this.getComponent(componentName);
      return this.$dialog.show({
        component,
        model: model ? cloneDeep(model) : null
      });
    },

    showMessageDialog({message}) {
      console.log('showing');
      this.$dialog = this.$refs['dialog'];
      return this.$dialog.show({message});
    },

    // Helper method for updating nested values
    // NOTE: getNestedProperty gets the last reference, but
    // to assign we want the second last!
    assignNestedValue(ref, value) {
      let props = ref.split('.');
      let prop = props.pop();
      if (props && props.length) {
        ref = getNestedProperty(this.model, props.join('.'));
      }
      this.$set(props.length >= 1 ? ref : this.model, prop, value);
    },

    autofillPID(ref) {
      switch (ref) {
        case 'legalentity':
          this.assignPID('legalentitypid');
          break;
        case 'substance':
          this.assignPID('substancepid');
          break;
        case 'product':
          this.assignPID('productpid');
          break;
        case 'dossier':
          this.assignPID('dossierpid');
          break;
        case 'file':
          this.assignPID('filegeneric.filepid');
          break;
        case 'document':
          this.assignPID('documentgeneric.documentpid');
          break;
      }
    },

    // Assigns generated PIDs to a a specific field
    assignPID(ref) {
      this.assignNestedValue(ref, generatePID());
    },

    // Adds a new item to tables via dialogs
    // ref is used to retrieve the corrent component and
    // then to assign the new record to it
    addTableItem(ref) {
      this.showFormDialog(ref)
      .then(result => {
        ref = getNestedProperty(this.model, ref);

        // if it's a duplicate, fail
        // need to: for every item, check each non DB prop
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
      })
      .catch(() => {
        this.showMessage(this.$t('ADD_ITEM_FAILURE'));
      })
      .then(() => {
        this.$dialog.close();
      });
    },

    // allows for updating a table item
    selectTableItem(componentName, model, index) {
      this.showFormDialog(componentName, merge(this.getEmptyModel(componentName), model))
      .then(result => {
        let ref = getNestedProperty(this.model, componentName);
        console.log(ref);
        if (index != null) this.$set(
          ref,
          index,
          result
        );
        else ref.push(result);
      }, err => {
        console.err('made it here', err);
        this.showMessage(this.$t('ADD_ITEM_FAILURE'));
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.$dialog.close();
      });
    },

    // Handles table events
    handleAction(event, items, compName) {
      switch(event.type) {
        case 'delete': {
          items.splice(event.index, 1);
          break;
        }
        case 'edit':
          return this.showFormDialog(compName);
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
        this.setSubmissionState(to.path.startsWith('/submission'));
        next();
      }, err => console.error(err))
      .catch(() => {
        console.log('Route change cancelled');
      })
      .then(() => {
        this.$dialog.close();
      });
    }
    else {
      this.setSubmissionState(to.path.startsWith('/submission'));
      next();
    }
  }
};

export {model};
