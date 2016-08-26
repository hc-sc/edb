import { Dossier, ReferencedDossier, DossierRA } from './dossier.model';
import Submission from '../submission/submission.model';
import SubmissionController from '../submission/submission.controller';
import _ from 'lodash';

export default class DossierCtrl {
  constructor() {}
}

// export default class DossierController {
//   constructor($mdDialog, dossierService, pickListService, receiverService) {
//     this.$mdDialog = $mdDialog;
//     this.dossierService = dossierService;
//     this.pickListService = pickListService;
//     this.receiverService = receiverService;
//     this.dossier = {};

//     this.pickListService.getType('EXTENSION_TYPE_APPLICATION_TYPE')
//       .then(appTypes => {
//         this.applicationTypes = appTypes;

//         return this.pickListService.getType('EXTENSION_TYPE_REGULATORY_TYPE');
//       })
//       .then(regTypes => {
//         this.regulatoryTypes = regTypes;

//         return this.receiverService.getRAsWithLegalEntityName();
//       })
//       .then(ras => {
//         this.receiversWithNames = ras;

//         return this.initFromDB();
//       })
//       .catch(err => console.log(err.stack));
//   }

//   initFromDB() {
//     this.dossierService.getDossiers()
//       .then(dossiers => {
//         if (dossiers.length > 0) {
//           this.dossier = new Dossier(dossiers[0]);
//         }
//         else this.dossier = new Dossier();
//       })
//       .catch(err => console.log(err.stack));
//   }

//   saveDossier($event) {
//     if (this.dossier._id) {
//       return this.dossierService.updateDossier(this.dossier)
//         .then(() => {
//           // this.$mdDialog.show(
//           //     this.$mdDialog
//           //         .alert()
//           //         .clickOutsideToClose(true)
//           //         .title('Success')
//           //         .content('Dossier Updated Successfully!')
//           //         .ok('Ok')
//           //         .targetEvent($event)
//           // );
//         })
//         .catch(err => console.log(err.stack));
//     }
//     else {
//       return this.dossierService.createDossier(this.dossier)
//         .then(createdRow => {
//           // this.$mdDialog.show(
//           //     this.$mdDialog
//           //         .alert()
//           //         .clickOutsideToClose(true)
//           //         .title('Success')
//           //         .content('Dossier Added Successfully!')
//           //         .ok('Ok')
//           //         .targetEvent($event)
//           // );

//           this.dossier = new Dossier(createdRow);
//         })
//         .catch(err => console.log(err.stack));
//     }
//   }

//   addSubmission() {
//     this.showSubmissionDiag(new Submission());
//   }

//   saveSubmission(sub) {
//     if (!_.includes(this.dossier.SUBMISSION, sub)) {
//       this.dossier.addSubmission(sub);
//     }
//     this.dossierService.updateDossier(this.dossier);
//   }

//   addReferencedDossier() {
//     this.dossier.addReferencedDossier(new ReferencedDossier());
//   }

//   deleteReferencedDossier(rd, $event) {
//     const confirm = this.$mdDialog.confirm()
//       .title('Delete Referenced Dossier')
//       .content('Are you sure you want to delete this Referenced Dossier?')
//       .ok('Yes')
//       .cancel('No')
//       .targetEvent($event);

//     this.$mdDialog.show(confirm)
//       .then(() => {
//         _.pull(this.dossier.REFERENCED_DOSSIER, rd);
//         this.dossierService.updateDossier(this.dossier);
//       })
//       .catch(err => console.log(err.stack));
//   }

//   addDossierRA() {
//     this.dossier.addDossierRA(new DossierRA());
//   }

//   deleteDossierRA(dra, $event) {
//     const confirm = this.$mdDialog.confirm()
//       .title('Delete Dossier RA')
//       .content('Are you sure you want to delete this Dossier RA?')
//       .ok('Yes')
//       .cancel('No')
//       .targetEvent($event);

//     this.$mdDialog.show(confirm)
//       .then(() => {
//         _.pull(this.dossier.DOSSIER_RA, dra);
//         this.dossierService.updateDossier(this.dossier);
//       })
//       .catch(err => console.log(err.stack));
//   }

//   updateRegulatoryType(dra) {
//     if (dra.REGULATORY_TYPE.VALUE === this.pickListService.getOtherValue()) {
//       dra.REGULATORY_TYPE.ATTR_VALUE = '';
//       dra.setRegulatoryValueDecode('');
//     }
//     else {
//       delete dra.REGULATORY_TYPE.ATTR_VALUE;
//       dra.setRegulatoryValueDecode(dra.REGULATORY_TYPE.VALUE);
//     }
//   }

//   updateApplicationType(dra) {
//     if (dra.APPLICATION_TYPE.VALUE === this.pickListService.getOtherValue()) {
//       dra.APPLICATION_TYPE.ATTR_VALUE = '';
//       dra.setApplicationValueDecode('');
//     }
//     else {
//       delete dra.APPLICATION_TYPE.ATTR_VALUE;
//       dra.setApplicationValueDecode(dra.APPLICATION_TYPE.VALUE);
//     }
//   }

//   showSubmissionDiag(sub, $event) {
//     this.$mdDialog.show({
//       controller: SubmissionController,
//       controllerAs: '_ctrl',
//       templateUrl: './scripts/submission/submission-manage.html',
//       parent: angular.element(document.body),
//       targetEvent: $event,
//       clickOutsideToClose: false,
//       locals: {
//         submission: sub,
//         dossierController: this
//       }
//     });
//   }

//   viewDossierGHSTS($event) {
//     if (!_.isEmpty(this.dossier)) {
//       this.saveDossier()
//         .then(() => {
//           this.dossierService.getDossierGHSTSById(this.dossier._id)
//             .then(dossier => {
//               this.$mdDialog.show(
//                 this.$mdDialog
//                   .alert()
//                   .clickOutsideToClose(true)
//                   .title('Dossier GHSTS')
//                   .content(dossier)
//                   .ok('Ok')
//                   .targetEvent($event)
//               );
//             });
//         })
//         .catch(err => console.log(err.stack));
//     }
//   }

//   initializeDossierFromXml() {
//     this.dossierService.initializeDossiers()
//       .then(() => {
//         this.initFromDB();
//       })
//       .catch(err => console.log(err.stack));
//   }
// }