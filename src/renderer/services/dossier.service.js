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

  getSubmission(dossierPID, submissionNumber) {
    return this.getAllDossiers()
    .then(items => {
      for (let dossier of items) {
        if (dossierPID === dossier.DOSSIER_PID) {
          for (let submission of dossier.SUBMISSIONS) {
            if (submissionNumber == submission.SUBMISSION_NUMBER) {
              return submission.DOSSIER;
            }
          }
        }
      }
    });
  }

  getAllDossiers() {
    return this.$http.get('dummy-data/dossiers.json')
    .then(response => {
      return response.data;
    });
  }
}