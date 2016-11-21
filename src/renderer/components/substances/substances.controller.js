
import BaseCtrl from '../common/BaseCtrl';


export class SubstancesCtrl {
    constructor($state, AppDataService) {
      this.$state = $state;
      this.appDataService = AppDataService.getService();

      // won't need this line when using db instead of file
       this.appDataService.edb_get({ url: 'substance', data: {} }).then(ret => {
            this.substances = JSON.parse(ret.data);
            this.selected = this.substances.data.substances.substance[0];
        });
      console.log(this.selected);

      this.picklists = {
        metadataStatusOptions: JSON.parse(this.metadataStatusOptions.data),
        identifierTypeOptions: JSON.parse(this.identifierTypeOptions.data)
      };

    }

    select(item) {
      this.selected = this.substances.filter(sub => {
        return sub.id === item.id;
      })[0];
    }

    add(item) {
      // this.AppDataService.getService().edb_put({
      //   url: 'legal-entities',
      // });
    }
  }
