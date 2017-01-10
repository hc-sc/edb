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

import modelDocument from '../view-models/gen/document.json';
import modelDocumentGeneric from '../view-models/gen/documentgeneric.json';
import modelDocumentRA from '../view-models/gen/documentra.json';
import modelDocumentNumber from '../view-models/gen/documentnumber.json';
import modelDocumentContentStatus from '../view-models/gen/contentstatushistory.json';
import modelReferencedDocument from '../view-models/gen/referenceddocument.json';
import modelReLatedToSubstance from '../view-models/gen/relatedtosubstance.json';
import modelReferencedToFile from '../view-models/gen/referencedtofile.json';

import modelSender from '../view-models/gen/sender.json';
import modelReceiver from '../view-models/gen/receiver.json';


export default class ModelService {
  constructor() {}
  getModel(prop) {
    console.log('in model service', prop);
    let model = {};
    switch(prop) {
      case 'contactaddress':
        return Object.assign(modelContactAddress.fields);
      case 'legalentityidentifier':
        return Object.assign(modelLegalEntityIdentifier.fields);
      case 'contactperson':
        return Object.assign(modelContactPerson.fields);
      case 'legalentity':
        model = Object.assign(modelLegalEntity.fields);
        model.contactaddress = this.getModel('contactaddress');
        model._url = 'legalentity';
        return model;
      case 'substance':
        model = Object.assign(modelSubstance.fields);
        model._url = prop;
        return model;
      case 'substanceidentifier':
        return Object.assign(modelSubstanceIdentifier.fields);
      case 'file':
        model = Object.assign(modelFile.fields);
        model._url = prop;
        return model;
      case 'filera':
        return Object.assign(modelFileRA.fields);
      case 'product':
        model = Object.assign(modelProduct.fields);
        model.ingredients = {ingredient: []};
        model._url = 'product';
        return model;
      case 'productra':
        return Object.assign(modelProductRA.fields);
      case 'ingredients.ingredient':
        return Object.assign(modelIngredient.fields);

      case 'document':
        model = Object.assign(modelDocument.fields);
        model.documentgeneric = this.getModel('documentgeneric');
        model._url = 'document';
        return model;

      case 'documentgeneric':
        return Object.assign(modelDocumentGeneric.fields);

      case 'documentra':
        return Object.assign(modelDocumentRA.fields);

      case 'documentgeneric.documentnumber':
        return Object.assign(modelDocumentNumber.fields);

      case 'documentgeneric.contentstatushistory':
        return Object.assign(modelDocumentContentStatus.fields);

      case 'documentgeneric.referenceddocument':
        return  Object.assign(modelReferencedDocument.fields);

      case 'documentgeneric.relatedtosubstance':
        return Object.assign(modelReLatedToSubstance.fields);

      case 'documentgeneric.referencedtofile':
        return Object.assign(modelReferencedToFile.fields);

      case 'sender':
        return Object.assign(modelSender.fields);

      case 'receiver':
        return Object.assign(modelReceiver.fields);

    }
  }
}




