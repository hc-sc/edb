export default class AppCtrl {
  constructor($rootScope) {
    $rootScope.project = {
      product: 'Submissions',
      dossier: 'some dossier',
      submission: 'lala'
    };
  }
}