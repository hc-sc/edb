import angular from 'angular';
import BaseCtrl from '../common/base.controller';
import IdentiferCtrl from './identifier.controller';
import identifierTemplate from './identifier.Template';



export class SubstancesCtrl extends BaseCtrl {
  constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService) {
    super($mdDialog, $mdToast, $state, PicklistService, AppDataService, 'substance');
    this.metadataStatusOptions = JSON.parse(this.metadataStatusOptions.data);
    this.identifierTypeOptions = JSON.parse(this.identifierTypeOptions.data);
    this.identifierProjection = [
      'identifier',
      'substanceidentifiertype'
    ];
    //converts substanceidentifiertype with value
    this.getAppData().then(records => {
      console.log(records);
      this.records = JSON.parse(records.data);
      this.selected = this.records[0];
      console.log(this.selected);
      this.convertsTypes(this.selected);

      this.loading = false;
    });
  }

  convertsTypes(selected) {
    let self = this;
    selected.substanceidentifier.forEach(function (element) {
      let identifierTypeId = element.substanceidentifiertype;
      let identifierType=self.picklistService.edb_getSync({'TYPE_NAME': 'EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE', _id: identifierTypeId });
      let identifierTypeData =JSON.parse(identifierType.data);
      /*
        [{
          "_lastMod": {
            "$wrap": "$date",
            "v": 1479138055865,
            "h": "2016-11-14T15:40:55.865Z"
          },
          "TYPE_NAME": "EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE",
          "value": "CASNO",
          "_created": {
            "$wrap": "$date",
            "v": 1479138055681,
            "h": "2016-11-14T15:40:55.681Z"
          },
          "_state": "active",
          "_version": "01.00.00",
          "_url": "picklist",
          "_id": {
            "$wrap": "$oid",
            "v": "5829db075ec38012b06983f3"
          },
          "isExt": false,
          "status": "enabled",
          "valuedecode": "CASNO",
          "__v": 0
        }];
        */
      identifierTypeData.forEach(function (dataElement) {
        console.log(element.substanceidentifiertype);
        console.log(dataElement.value);
        element.substanceidentifiertype = dataElement.value;

      });
      /*
            self.picklistService.edb_get({ _id: identifierTypeId })
              .then(result => {
                console.log(result.data);
                JSON.parse(result.data).forEach(function (dataElement) {
                  console.log(element.substanceidentifiertype);
                  console.log(dataElement.value);
                  element.substanceidentifiertype= dataElement.value;
                  
                });
              }) */


    });
  }
  add(item) {
    this.showMessage('hi there');
  }

  save() {
    console.log(this.selected);
    this.appDataService.edb_post(angular.copy(this.selected)).then(result => console.log(result + " save successfully"), error => console.log(error));
  }

  toggleList() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  createPicklistItem(prop, arr, value) {
    console.log(prop, value);
    return this.picklistService.edb_put(value)
      .then(result => {
        let item = JSON.parse(result.data);
        console.log(item._id, this.selected[prop]);
        this[arr].slice().concat(item);
        this.selected[prop] = item._id;
        console.log(this.selected[prop]);

        this.showMessage(value.valuedecode, 'added successfully!');
      })
      .catch(err => {
        this.showMessage('Error creating new picklist item');
      });
  }

  update(prop, value) {
    this.selected[prop] = value;
  }
  select(name, index) {
    this.$mdDialog.show({
      template: identifierTemplate,
      controllerAs: '$ctrl',
      controller: IdentiferCtrl,
      locals: {
        index,
        identifer: this.selected.substanceidentifier[index],
        identifierTypeOptions: this.identifierTypeOptions
      }
    })
      .then(item => {
        console.log(item);
        this.selected.substanceidentifier[index] = item;
        // angular doesn't trigger update if just one element is updated, need to change the object itself
        this.selected.substanceidentifier = this.selected.substanceidentifier.slice();
      }, item => {
        console.log('cancelled ', item);
      });
  }
  delete(name, index) {
    console.log(index);
  }
} 
