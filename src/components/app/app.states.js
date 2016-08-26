import AppCtrl from './app.controller';

export default function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      template: `
      <div class='site-content' ui-view></div>
    `,
      controller: AppCtrl
    })
    .state('app.home', {
      url: '/',
      template: '<home></home>'
    })
    .state('app.project', {
      url: '/project',
      template: '<project></project>'
    })
    .state('app.dropdowns', {
      url: '/dropdowns',
      template: '<dropdowns></dropdowns>'
    })
    .state('app.settings', {
      url: '/settings',
      template: '<settings></settings>'
    })
    .state('app.edit', {
      url: '/edit',
      template: '<edit></edit>'
    })
    .state('app.edit.documents', {
      url: '/documents',
      template: '<documents flex></documents>'
    })
    .state('app.edit.dossier', {
      url: '/dossier',
      template: '<dossier flex></dossier>'
    })
    .state('app.edit.product', {
      url: '/product',
      template: '<product flex></product>'
    })
    .state('app.edit.files', {
      url: '/files',
      template: '<files flex></files>'
    })
    .state('app.edit.receivers', {
      url: '/receivers',
      template: '<receivers flex></receivers>'
    })
    .state('app.edit.legal-entities', {
      url: '/legalEntities',
      template: '<legal-entities flex></legal-entities>'
    })
    .state('app.edit.substance', {
      url: '/substance',
      template: '<substance flex></substance>'
    });

  $urlRouterProvider.otherwise('/');
}