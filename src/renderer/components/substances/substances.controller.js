
import BaseCtrl from '../common/BaseCtrl';

export class SubstancesCtrl extends BaseCtrl {
    constructor($mdDialog, $state, PicklistService, GhstsService, AppDataService) {
        super($mdDialog, $state, PicklistService, GhstsService, AppDataService, 'substance');
        let self = this;
        this.items = []; //declare a whole entity instead of some specific fields
        //use injected service

        this.getRecords().then(results => {
            let data = JSON.parse(results.data);

            if (data.length !== 0) {
                //get url
                console.log(data._url);
            }

            self.items = data;
            
            // .map(item => {
            //     console.log(item.substancename);
            //     return { name: item.substancename };
            // });
        });
        // options for metadata status
        self.pickListService.edb_get({'TYPE_NAME': 'TYPE_METADATA_STATUS'})
            .then(metadataStatusOptions => {
                console.log(metadataStatusOptions);
                self.metadataStatusOptions = metadataStatusOptions.data;
             //   return self.pickListService.edb_get('EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE', true);
            });

        self.pickListService.edb_get({'TYPE_NAME': 'EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE'})
            .then(identifierTypeOptions => {
                console.log(identifierTypeOptions);
                self.identifierTypeOptions = identifierTypeOptions.data;
             //   return self.pickListService.edb_get('EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE', true);
            });

            /*
            .then(identifierTypeOptions => {
                // options for identifier types
                console.log(identifierTypeOptions);
                self.identifierTypeOptions = identifierTypeOptions.data;
            })
            */
        console.log('substancesCtrl here');
        // this.$state.go('submission.legalEntities'); //state works
    }

    //model fields handler methods
    select(item) {
        console.log(item);
       // this.$state.go('submission.legalEntities');
    }
}
