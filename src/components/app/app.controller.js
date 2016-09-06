export default class AppCtrl {
  constructor($rootScope, $q, PicklistService) {
    $rootScope.project = {
      product: 'Submissions',
      dossier: 'some dossier',
      submission: 'lala'
    };
    PicklistService.getService()
      .initPicklistFromXSD()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

AppCtrl.$inject = ['$rootScope', '$q', 'PicklistService'];