export default function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    component: 'home',
    resolve: {
      dossiers: DossierService => {
        return DossierService.getAllDossiers();
      }
    }
  })
  .state('dossier', {
    url: '/dossier/:dossierPID',
    component: 'dossier',
    resolve: {
      dossier: (DossierService, $stateParams) => {
        return DossierService.getDossier($stateParams.dossierPID);
      }
    }
  })
  .state('submission', {
    url: '/submission',
    component: 'submission'
  })
  .state('submission.description', {
    url: '/description',
    component: 'description'
  })
  .state('submission.legalEntities', {
    url: '/legal-entities',
    component: 'legalEntities'
  })
  .state('submission.receivers', {
    url: '/receivers',
    component: 'receivers'
  })
  .state('submission.substances', {
    url: '/substances',
    component: 'substances'
  })
  .state('submission.product', {
    url: '/product',
    component: 'product'
  })
  .state('submission.files', {
    url: '/files',
    component: 'files'
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
  });

  $urlRouterProvider.otherwise('/');
}