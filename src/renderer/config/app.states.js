export default function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('splash', {
      url: '/',
      component: 'splash'
    })
    .state('home', {
      url: '/home',
      component: 'home'
    })
    .state('submission', {
      abstract: true,
      url: '/submission/:submissionid/:dossierid',
      component: 'submission',
      resolve: {
        // submission: (AppDataService, $stateParams) => {
        //   console.log($stateParams.submissionid);
        //   AppDataService.getService()
        //     .edb_get({url: 'submission', data: {_id: '583605871b3d001308987898'}})
        //     .then(ret => {
        //       let retVal = JSON.parse(ret.data);
        //       console.log('submission resolved - ' + retVal.length);
        //       return retVal[0];
        //     });
        // },
        // dossier: (AppDataService, $stateParams) => {
        //   console.log($stateParams.dossierid);
        //   AppDataService.getService()            
        //     .edb_get({url: 'dossier', data: {_id: '583605871b3d0013089878bf'}})
        //     .then(ret => {
        //       let retVal = JSON.parse(ret.data);
        //       console.log('dossier resolved - ' + retVal.length);
        //       return retVal[0];
        //     });
        // }
      }
    })
    .state('submission.receivers', {
      url: '/receivers',
      component: 'receivers'
    })
    .state('submission.toc', {
      url: '/toc',
      component: 'toc'
    })
    .state('submission.description', {
      url: '/description',
      component: 'description'
    })
    .state('globals.files', {
      url: '/files',
      component: 'files'
    })
    .state('globals', {
      url: '/globals',
      component: 'globals'
    })
    .state('globals.substances', {
      url: '/substances',
      component: 'substances',
      resolve: {
        // for testing purposes, this should already be loaded in the db in the future
        metadataStatusOptions: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_METADATA_STATUS' });
        },
        identifierTypeOptions: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE' });
        }
      }
    })
    .state('globals.legalEntities', {
      url: '/legal-entities',
      component: 'legalEntities',
      resolve: {
        legalEntityType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_LEGALENTITY_TYPE' });
        },
        legalEntityIdentifierType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_LEGALENTITY_IDENTIFIER_TYPE' });
        },
        countries: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_COUNTRY' });
        }
      }
    })

    .state('globals.products', {
      url: '/products',
      component: 'products',
      resolve: {
        products: ProductService => {
          return ProductService.getProducts();
        }
      }
    })
    .state('globals.products.product', {
      url: '/:productPID',
      component: 'product',
      resolve: {
        product: (ProductService, $stateParams) => {
          return ProductService.getProduct($stateParams.productPID);
        }
      }
    })
    .state('globals.documents', {
      url: '/documents',
      component: 'documents',
      resolve: {
        documents: AppDataService => {
          return AppDataService.getService().edb_get({ url: 'picklist', data: {} });
        }
      }
    })
    .state('settings', {
      url: '/settings',
      component: 'settings'
    });

  $urlRouterProvider.otherwise('/splash');
}