export default function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('splash', {
    url: '/',
    component: 'splash'
  })
  .state('home', {
    url: '/home',
    component: 'home',
    // resolve: {
    //   dossiers: GhstsService => {
    //     return GhstsService.getService().edb_get();
    //   }
    // }
  })
  .state('submission', {
    abstract: true,
    url: '/submission/:dossierPID/:submissionNumber',
    component: 'submission',
    resolve: {
      submission: (DossierService, $stateParams) => {
        return DossierService.getSubmission($stateParams.dossierPID, $stateParams.submissionNumber);
      }
    }  })
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
    component: 'substances'
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