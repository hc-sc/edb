
import BaseCtrl from '../common/BaseCtrl';

export class SubstancesCtrl {
    constructor($state, AppDataService) {
      this.$state = $state;
      this.AppDataService = AppDataService;

      // won't need this line when using db instead of file
      this.substances = this.substances.data.substances.substance;
      this.selected = this.substances[0];
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
