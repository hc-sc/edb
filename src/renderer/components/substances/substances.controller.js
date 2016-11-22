
import BaseCtrl from '../common/base.controller';
//import identifierTemplate from './identifierTemplate';



export class SubstancesCtrl extends BaseCtrl {
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, 'substance');
        this.metadataStatusOptions=JSON.parse(this.metadataStatusOptions.data);
        this.identifierTypeOptions=JSON.parse(this.identifierTypeOptions.data);

    }

    add(item) {
      this.showMessage('hi there');
    }

    save() {
      console.log(this.selected);
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
    select(index){
              this.$mdDialog.show({
          template: identifierTemplate,
          controllerAs: '$ctrl',
          controller: DossierRACtrl,
          locals: {
            index,
            dossierRA: this.submission.DOSSIER_RA[index]
          }
        })
        .then(item => {
          this.submission.DOSSIER_RA[index] = item;
          // angular doesn't trigger update if just one element is updated, need to change the object itself
          this.submission.DOSSIER_RA = this.submission.DOSSIER_RA.slice();
        }, item => {
          console.log('cancelled ', item);
        });
    }
  } 
