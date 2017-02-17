import {picklistTypes} from '../view-models/picklist.model';

export default function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('splash', {
      url: '/splash',
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
    .state('submission.submissionNode', {
      url: '/submission-node',
      component: 'submissionNode'
    })
    .state('submission.toc', {
      url: '/toc',
      component: 'toc',
      resolve: {
        isSubmission: ['$stateParams', () => true]
      }
    })
    .state('submission.receivers', {
      url: '/receiver',
      component: 'receiver',
      resolve: {
        isSubmission: ['$stateParams', () => true]
      }
    })
    .state('submission.dossier', {
      url: '/dossier',
      component: 'description',
      resolve: {
        isSubmission: ['$stateParams', () => true]
      }
    })
    .state('submission.products', {
      url: '/products',
      component: 'products',
      resolve: {
        adminNumberType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_ADMIN_NUMBER_TYPE' });
        },
        formulationType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_FORMULATION_TYPE' });
        },
        unitType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_UNIT' });
        },
        isSubmission: ['$stateParams', () => true]
      }
    })
    .state('submission.documents', {
      url: '/documents',
      component: 'documents',
      resolve: {
        metadataStatusType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_METADATA_STATUS' });
        },
        contentStatusType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_CONTENT_STATUS' });
        },
        referenceType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_REFERENCE_TYPE' });
        },
        documentNumberType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_DOCUMENT_NUMBER_TYPE' });
        },
        dataprotectionType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_DATA_PROTECTION' });
        },
        datarequirementType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_DATA_REQUIREMENT' });
        },
        raDocumentNumberType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_RA_DOCUMENT_NUMBER_TYPE' });
        },
        isSubmission: ['$stateParams', () => true]
      }
    })
    .state('submission.files', {
      url: '/files',
      component: 'files',
      resolve: {
        fileType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_FILE_TYPE' });
        },
        contentStatus: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_CONTENT_STATUS' });
        },
        isSubmission: ['$stateParams', () => true]
      },
    })
    .state('globals', {
      url: '/globals',
      component: 'globals',
      onEnter: $rootScope => {
        $rootScope.title = 'Manage Application Data';
      },
      onStart: $rootScope => {
        $rootScope.loading = true;
      }
    })
    .state('globals.receivers', {
      url: '/receiver',
      component: 'receiver',
      resolve: {
        receivers: AppDataService => {
          return AppDataService.getService().edb_get({_url: 'receiver'});
        },
        isSubmission: ['$stateParams', () => false]
      },
    })
    .state('globals.senders', {
      url: '/sender',
      component: 'sender',
      resolve: {
        legalEntities: AppDataService => {
          return AppDataService.getService().edb_get({_url: 'legalentity'});
        },
        isSubmission: ['$stateParams', () => false]
      }
    })
    .state('globals.files', {
      url: '/files',
      component: 'files',
      resolve: {
        fileType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_FILE_TYPE' });
        },
        contentStatus: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_CONTENT_STATUS' });
        },
        isSubmission: ['$stateParams', () => false]
      }
    })
    .state('globals.substances', {
      url: '/substances',
      component: 'substances',
      resolve: {
        substanceIdentifierTypes: PicklistService => {
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
        adminNumberType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_ADMIN_NUMBER_TYPE' });
        },
        formulationType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_FORMULATION_TYPE' });
        },
        unitType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_UNIT' });
        },
        isSubmission: ['$stateParams', () => false]
      }
    })
    .state('globals.dossiers', {
      url: '/dossiers',
      component: 'description'
    })

    .state('globals.documents', {
      url: '/documents',
      component: 'documents',
      resolve: {
        metadataStatusType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_METADATA_STATUS' });
        },
        contentStatusType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_CONTENT_STATUS' });
        },
        referenceType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_REFERENCE_TYPE' });
        },
        documentNumberType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_DOCUMENT_NUMBER_TYPE' });
        },
        dataprotectionType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_DATA_PROTECTION' });
        },
        datarequirementType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'TYPE_DATA_REQUIREMENT' });
        },
        raDocumentNumberType: PicklistService => {
          return PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_RA_DOCUMENT_NUMBER_TYPE' });
        },
        isSubmission: ['$stateParams', () => false]
      }
    })
    .state('globals.picklists', {
      url: '/picklists',
      component: 'picklists',
      resolve: {
        picklists: PicklistService => {
          const picklistService = PicklistService.getService();
          return Promise.all(picklistTypes.map(picklist => {
            return picklistService.edb_get(picklist).then(items => {
              return {type: picklist, items: JSON.parse(items.data)};
            });
          }))
          .catch(err => console.error(err));
        }
      },
      onEnter: $rootScope => {
        $rootScope.loading = true;
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