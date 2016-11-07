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
  // .state('dossier', {
  //   url: '/dossier/:dossierPID',
  //   component: 'dossier',
  //   resolve: {
  //     dossier: (DossierService, $stateParams) => {
  //       return DossierService.getDossier($stateParams.dossierPID);
  //     }
  //   }
  // })
  .state('submission', {
    abstract: true,
    url: '/submission/:dossierPID/:submissionNumber',
    component: 'submission',
    resolve: {
      submission: (DossierService, $stateParams) => {
        return DossierService.getSubmission($stateParams.dossierPID, $stateParams.submissionNumber);
      }
    }  })
  .state('submission.description', {
    url: '/',
    component: 'description'
  })
  .state('submission.receivers', {
    url: '/receivers',
    component: 'receivers'
  })
  .state('submission.product', {
    url: '/product',
    component: 'product'
  })
  .state('submission.documents', {
    url: '/documents',
    component: 'documents'
  })
  .state('settings', {
    url: '/settings',
    component: 'settings'
  })
  .state('.description', {
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
    component: 'legalEntities'
  })
  .state('globals.products', {
    url: '/products',
    component: 'products'
  });

  $urlRouterProvider.otherwise('/splash');
}