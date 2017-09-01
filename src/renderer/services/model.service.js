import modelLegalEntity from '../view-models/gen/legalentity.json';
import modelContactAddress from '../view-models/gen/contactaddress.json';
import modelLegalEntityIdentifier from '../view-models/gen/legalentityidentifier.json';
import modelContactPerson from '../view-models/gen/contactperson.json';

import modelSubstance from '../view-models/gen/substance.json';
import modelSubstanceIdentifier from '../view-models/gen/substanceidentifier.json';
import modelFile from '../view-models/gen/file.json';
import modelFileRA from '../view-models/gen/filera.json';

import modelProduct from '../view-models/gen/product.json';
import modelProductRA from '../view-models/gen/productra.json';
import modelIngredient from '../view-models/gen/ingredient.json';
import modelAdminnumber from '../view-models/gen/adminnumber.json';

import modelDossierRA from '../view-models/gen/dossierra.json';
import modelReferencedDossier from '../view-models/gen/referenceddossier.json';

import modelDocument from '../view-models/gen/document.json';
import modelDocumentGeneric from '../view-models/gen/documentgeneric.json';
import modelDocumentRA from '../view-models/gen/documentra.json';
import modelDocumentNumber from '../view-models/gen/documentnumber.json';

// import modelDocumentContentStatusHistory from '../view-models/gen/documentcontentstatushistory.json';
// import modelDocumentContentStatus from '../view-models/gen/documentcontentstatus.json';

import modelReferencedDocument from '../view-models/gen/referenceddocument.json';
import modelReLatedToSubstance from '../view-models/gen/relatedtosubstance.json';
import modelReferencedToFile from '../view-models/gen/referencedtofile.json';
import modelOtherNationalGuideLine from '../view-models/gen/othernationalguideline.json';

import modelDossiercontext from '../view-models/gen/dossiercontext.json';

import modelRaDocumentNumber from '../view-models/gen/radocumentnumber.json';

import modelSender from '../view-models/gen/sender.json';
import modelReceiver from '../view-models/gen/receiver.json';
import _ from 'lodash';

const ModelService = {
  getModel(prop) {
    let model = {};
    switch(prop) {
      case 'contactaddress':
        return _.merge({}, Object.assign(modelContactAddress.fields));
      case 'legalentityidentifier':
        return _.merge({}, Object.assign(modelLegalEntityIdentifier.fields));
      case 'contactperson':
        return _.merge({}, Object.assign(modelContactPerson.fields));
      case 'legalentity':
        model = _.merge({}, Object.assign(modelLegalEntity.fields));
        model.contactaddress = this.getModel('contactaddress');
        model._url = 'legalentity';
        return model;
      case 'substance':
        model = _.merge({}, Object.assign(modelSubstance.fields));
        model._url = prop;
        return model;
      case 'substanceidentifier':
        return _.merge({}, Object.assign(modelSubstanceIdentifier.fields));
      case 'file':
        model = _.merge({}, Object.assign(modelFile.fields));
        model._url = prop;
        return model;
      case 'filera':
        return _.merge({}, Object.assign(modelFileRA.fields));
      case 'product':
        model = _.merge({}, Object.assign(modelProduct.fields));
        delete model.dossier;
        model.ingredients = {ingredient: []};
        model._url = 'product';
        return model;
      case 'productra':
        return _.merge({}, Object.assign(modelProductRA.fields));

      case 'ingredients.ingredient':
        return _.merge({}, Object.assign(modelIngredient.fields));

      case 'adminnumber':
        return _.merge({}, Object.assign(modelAdminnumber.fields));

      case 'dossierra':
        return _.merge({}, Object.assign(modelDossierRA.fields));
      case 'referenceddossier':
        return _.merge({}, Object.assign(modelReferencedDossier.fields));

      case 'document':
        model = _.merge({}, Object.assign(modelDocument.fields));
        model.documentgeneric = this.getModel('documentgeneric');
        model._url = 'document';
        model._docsourcetype = false;
        return model;

      case 'documentgeneric':
        model = _.merge({}, Object.assign(modelDocumentGeneric.fields));
        model.documentissuedate = '';
        return model;

      case 'documentra':
        model = _.merge({}, Object.assign(modelDocumentRA.fields));
        model.radocumentnumber = this.getModel('radocumentnumber');
        model.dataprotection = '';
        model.datarequirement = '';
        return model;

      case 'othernationalguideline':
        return _.merge({}, Object.assign(modelOtherNationalGuideLine.fields));

      case 'radocumentnumber':
        model = _.merge({}, Object.assign(modelRaDocumentNumber.fields));
        model.dossiercontext = [];
        return model;

      case 'dossiercontext':
        return _.merge({}, Object.assign(modelDossiercontext.fields));


      case 'documentgeneric.documentnumber':
        return _.merge({}, Object.assign(modelDocumentNumber.fields));

      case 'documentnumber':
        return _.merge({}, Object.assign(modelDocumentNumber.fields));


      // case 'documentgeneric.documentcontentstatushistory':
      //     model = _.merge({}, Object.assign(modelDocumentContentStatusHistory.fields));
      //     model.documentcontentstatus = [];
      //     return model;

      // case 'documentcontentstatus':
      //   return _.merge({}, Object.assign(modelDocumentContentStatus.fields));

      case 'documentgeneric.referenceddocument':
        model =  _.merge({}, Object.assign(modelReferencedDocument.fields));
        model.documentnumber = this.getModel('documentnumber');
        return model;

      case 'documentgeneric.relatedtosubstance':
        return _.merge({}, Object.assign(modelReLatedToSubstance.fields));

      case 'documentgeneric.referencedtofile':
        return _.merge({}, Object.assign(modelReferencedToFile.fields));

      case 'sender':
        model = _.merge({}, Object.assign(modelSender.fields));
        model._shortname = '';
        return model;

      case 'receiver':
        model = _.merge({}, Object.assign(modelReceiver.fields));
        delete model.sender;
        return model;
    }
  }
};

export {ModelService};




