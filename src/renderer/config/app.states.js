export default function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('splash', {
      url: '/',
      component: 'splash'
    })
    .state('home', {
      url: '/home',
      component: 'home',
      onEnter: $rootScope => {
        $rootScope.title = 'Dossiers';
      }
    })
    .state('submission', {
      abstract: true,
      url: '/submission/:submissionid/:dossiertitle/:dossierid/',
      component: 'submission',
      resolve: {
        dossierData: (AppDataService, $stateParams, $rootScope) => {
          $rootScope.title = $stateParams.dossiertitle;
          return {
            dossierid: $stateParams.dossierid,
            submissionid: $stateParams.submissionid
          };
        }
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
      component: 'globals',
      onEnter: $rootScope => {
        $rootScope.title = 'Manage Application Data';
      }
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
      component: 'settings',
      onEnter: $rootScope => {
        $rootScope.title = 'Settings';
      }
    });

  $urlRouterProvider.otherwise('/splash');
}