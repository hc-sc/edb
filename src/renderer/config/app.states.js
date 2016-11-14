export default function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('splash', {
    url: '/',
    component: 'splash'
  })
  .state('home', {
    url: '/home',
    component: 'home',
    resolve: {
      dossiers: DossierService => {
        return DossierService.getAllDossiers();
      }
    }
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
    component: 'globals',
    resolve: {

    }
  })
  .state('globals.substances', {
    url: '/substances',
    component: 'substances'
  })
  .state('globals.legalEntities', {
    url: '/legal-entities',
    component: 'legalEntities',
    resolve: {
      picklists: PicklistService => {
        return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_LEGALENTITY_TYPE' });
      }
    }
  })
  .state('globals.legalEntities.legalEntity', {
    url: '/:lePID',
    component: 'legalEntity'
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