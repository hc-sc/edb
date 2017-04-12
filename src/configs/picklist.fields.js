const PicklistFieldsConfig = {
  metadatastatus: {
    typename: 'TYPE_METADATA_STATUS', 
    isExt: false, 
    fieldPath: '', 
    jsonixName: 'GHSTS.TYPEMETADATASTATUSSTRUCT'
  },
  adminnumbertype: {
    typename: 'EXTENSION_TYPE_ADMIN_NUMBER_TYPE', 
    isExt: true, 
    fieldPath: 'GHSTS.GHSTS.PRODUCT.PRODUCTRA.ADMINNUMBER.ADMINNUMBERTYPE', 
    jsonixName: 'GHSTS.EXTENSIONTYPEADMINNUMBERTYPE'
  },
  regulatorytype: {
    typename: 'EXTENSION_TYPE_REGULATORY_TYPE', 
    isExt: true, 
    fieldPath: 'GHSTS.GHSTS.PRODUCT.DOSSIER.DOSSIERRA.REGULATORYTYPE', 
    jsonixName: 'GHSTS.EXTENSIONTYPEREGULATORYTYPE'
  },
  applicationtype: {
    typename: 'EXTENSION_TYPE_APPLICATION_TYPE', 
    isExt: true, 
    fieldPath: 'GHSTS.GHSTS.PRODUCT.DOSSIER.DOSSIERRA.APPLICATIONTYPE', 
    jsonixName: 'GHSTS.EXTENSIONTYPEAPPLICATIONTYPE'
  },
  formulationtype: {
    typename: 'EXTENSION_TYPE_FORMULATION_TYPE', 
    isExt: true, 
    fieldPath: 'GHSTS.GHSTS.PRODUCT.FORMULATIONTYPE', 
    jsonixName: 'GHSTS.EXTENSIONTYPEFORMULATIONTYPE'
  },
  unit: {
    typename: 'EXTENSION_TYPE_UNIT', 
    isExt: true, 
    fieldPath: 'GHSTS.GHSTS.PRODUCT.INGREDIENTS.INGREDIENT.UNIT', 
    jsonixName: 'GHSTS.EXTENSIONTYPEUNIT'
  },
  legalentitytype: {
    typename: 'EXTENSION_TYPE_LEGALENTITY_TYPE', 
    isExt: true, 
    fieldPath: 'GHSTS.GHSTS.LEGALENTITIES.LEGALENTITY.LEGALENTITYTYPE', 
    jsonixName: 'GHSTS.EXTENSIONTYPELEGALENTITYTYPE'
  },
  country: {
    typename: 'EXTENSION_TYPE_COUNTRY', 
    isExt: true, 
    fieldPath: 'GHSTS.GHSTS.LEGALENTITIES.LEGALENTITY.CONTACTADDRESS.COUNTRY', 
    jsonixName: 'GHSTS.EXTENSIONTYPECOUNTRY'
  },
  legalentityidentifiertype: {
    typename: 'EXTENSION_TYPE_LEGALENTITY_IDENTIFIER_TYPE', 
    isExt: true, 
    fieldPath: 'GHSTS..GHSTS.LEGALENTITIES.LEGALENTITY.LEGALENTITYIDENTIFIER.LEGALENTITYIDENTIFIERTYPE', 
    jsonixName: 'GHSTS.EXTENSIONTYPELEGALENTITYIDENTIFIERTYPE'
  },
  substanceidentifiertype: {
    typename: 'EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE', 
    isExt: true, 
    fieldPath: 'GHSTS.GHSTS.SUBSTANCES.SUBSTANCE.SUBSTANCEIDENTIFIER.SUBSTANCEIDENTIFIERTYPE', 
    jsonixName: 'GHSTS.EXTENSIONTYPESUBSTANCEIDENTIFIERTYPE'
  },
  // documentcontentstatus: {
  //   typename: 'TYPE_DOCUMENT_CONTENT_STATUS', 
  //   isExt: false, 
  //   fieldPath: '', 
  //   jsonixName: 'GHSTS.TYPEDOCUMENTCONTENTSTATUSSTRUCT'
  // },
  filetype: {
    typename: 'TYPE_FILE_TYPE', 
    isExt: false, 
    fieldPath: '', 
    jsonixName: 'GHSTS.GHSTS.FILES.FILE.FILEGENERIC.FILETYPE'
  },
  dataprotection: {
    typename: 'TYPE_DATA_PROTECTION', 
    isExt: false, 
    fieldPath: '', 
    jsonixName: 'GHSTS.GHSTS.DOCUMENTS.DOCUMENT.DOCUMENTRA.DATAPROTECTION'
  },
  datarequirement: {
    typename: 'TYPE_DATA_REQUIREMENT', 
    isExt: false, 
    fieldPath: '', 
    jsonixName: 'GHSTS.GHSTS.DOCUMENTS.DOCUMENT.DOCUMENTRA.DATAREQUIREMENT'
  },
  radocumentnumbertype: {
    typename: 'EXTENSION_TYPE_RA_DOCUMENT_NUMBER_TYPE', 
    isExt: true, 
    fieldPath: 'GHSTS.GHSTS.DOCUMENTS.DOCUMENT.DOCUMENTRA.RADOCUMENTNUMBER.RADOCUMENTNUMBERTYPE', 
    jsonixName: 'GHSTS.EXTENSIONTYPERADOCUMENTNUMBERTYPE'
  },
  documentnumbertype: {
    typename: 'EXTENSION_TYPE_DOCUMENT_NUMBER_TYPE', 
    isExt: true, 
    fieldPath: 'GHSTS.GHSTS.DOCUMENTS.DOCUMENT.DOCUMENTGENERIC.DOCUMENTNUMBER.DOCUMENTNUMBERTYPE', 
    jsonixName: 'GHSTS.EXTENSIONTYPEDOCUMENTNUMBERTYPE'
  },
  referencetype: {
    typename: 'TYPE_REFERENCE_TYPE', 
    isExt: false, 
    fieldPath: '', 
    jsonixName: 'GHSTS.DOCUMENTS.DOCUMENT.DOCUMENTGENERIC.REFERENCEDDOCUMENT.REFERENCETYPE'
  },
  tocowner: {
    typename: 'EXTENSION_TYPE_TOC_OWNER', 
    isExt: true, 
    fieldPath: 'GHSTS.GHSTS.TOC.TOCOWNER', 
    jsonixName: 'GHSTS.EXTENSIONTYPETOCOWNER'
  },
  nodeassignmentstatus: {
    typename: 'TYPE_NODE_ASSIGNMENT_STATUS',
    isExt: false,
    fieldPath: 'GHSTS.GHSTS.TOC.STRUCTURE.TOCNODE.TOC2DOC.NODEASSIGNMENTSTATUS', 
    jsonixName: 'GHSTS.TYPENODEASSIGNMENTSTATUS'
  }


};

// const getPropertyName = (typename) => {
//   for (const propName in PicklistFieldsConfig) {
//     if Object.hasOwnProperty()
//   }
// }

(function (exports) {
  let keys = Object.keys(PicklistFieldsConfig);

  keys.map(key => {
    exports[key] = PicklistFieldsConfig[key];
  });
})(typeof exports === 'undefined' ? this['PicklistFieldsConfig'] = {} : exports);