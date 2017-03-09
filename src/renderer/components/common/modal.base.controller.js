import NestedPropertyProc from '../../../utils/nested-property.process';

export default class ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService, $scope, ModelService) {
    this.$mdDialog = $mdDialog;
    this.index = index;
    this.node = node;
    this.picklists = picklists;
    this.picklistService = picklistService;
    this.$scope = $scope;
    this.modelService = ModelService;
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  confirm() {
    this.$mdDialog.hide(this.node);
  }

  getModel(prop) {
    return this.modelService.getModel(prop);
  }

  // initializeModel(modelName){
  //   let modelObj = this.getModel(modelName);
  //   let iterableObject = Object.keys(modelObj);
  //   for (const modelProp of iterableObject) {
  //       modelObj[modelProp] = "";
  //   }

  //   return modelObj;
  // }

  addSubMissionContext(prop, model) {
    let modelName = model ? model : prop;  
    let modelObj = this.getModel(modelName); 
    this.node[model][prop].push(modelObj);
  }

  deleteSubArray(prop, index, model) {
    this.node[model][prop] = this.node[model][prop].slice(0, index).concat(this.node[model][prop].slice(index + 1));
  }

  addString(prop){
    this.node[prop].push('');
  }

  add(prop, model) {
    let modelName = model ? model : prop; 
    this.node[prop].push(this.getModel(modelName));
  }

  update(prop, value) {
    NestedPropertyProc.setValue(this.node, prop, value);
  }

  updateArray(prop, index, value, parentArray) {
    if (parentArray && Array.isArray(this.node[parentArray])) {
      this.node[parentArray][index][prop] = value;
    } else
      this.node[prop][index] = value;
  }

  deleteArray(prop, index) {
    this.node[prop] = this.node[prop].slice(0, index).concat(this.node[prop].slice(index + 1));
  }

  // generates a picklist item.
  // prop - the node your changing
  // arr - the array of picklist items used to population the select field
  // value - the new picklist value
  createPicklistItem(prop, arr, value, index, parentArray) {
    return this.picklistService.edb_put(value)
    .then(result => {
      let item = JSON.parse(result.data);
      this.picklists[arr].push(item);

      // need to allow the select component to update BEFORE assigning a new selected
      // in the future, have the select component use lifecycle methods to return when it is finished
      setTimeout(() => {
        if (parentArray && Array.isArray(this.node[parentArray]) && index >= 0) {
          this.node[parentArray][index][prop] = item._id;
        }
        else
          NestedPropertyProc.setValue(this.node, prop, item._id);
        // this.node[prop] = item._id;
        this.$scope.$apply();
      }, 200);
    })
    .catch(err => {
      console.log('Error creating new picklist item');
    });
  }

  getReceivers() {
    let receiverIds = [];
    let isSubmission = this.isSubmission ? this.isSubmission : false;
    if (isSubmission) {
      this.ghsts._receiver.map(rec => {
        receiverIds.push(rec.receiver);
      });
    }
    if (isSubmission) {
      if (receiverIds.length === 0) {
        this.receivers = [];
        return Promise.resolve(true);
      } else {
        return this.appDataService.edb_get({_url: 'receiver', data: {where: receiverIds}})
          .then(ret => {
            this.receivers = JSON.parse(ret.data);
          })
          .catch(err => {
            console.log(err);
            this.receivers = [];
          });
      }
    } else {
      return this.appDataService.edb_get({_url: 'receiver'})
        .then(ret => {
          this.receivers = JSON.parse(ret.data);
        })
        .catch(err => {
          console.log(err);
          this.receivers = [];
        });
    }
  }
}