export default class DossierService {
  constructor($http) {
    this.$http = $http;
  }

  getDossier(dossierPID) {
    return this.getAllDossiers()
    .then(items => {
      return items.filter(item => {
        return item.DOSSIER_PID === dossierPID;
      });
    });
  }

  getAllDossiers() {
    return this.$http.get('data/dossiers.json')
    .then(response => {
      return response.data;
    });
  }
}