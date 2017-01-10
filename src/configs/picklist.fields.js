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
    fieldPath: '', 
    jsonixName: ''
  },
  country: {
    typename: 'EXTENSION_TYPE_COUNTRY', 
    isExt: true, 
    fieldPath: '', 
    jsonixName: ''
  },
  substanceidentifiertype: {
    typename: 'EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE', 
    isExt: true, 
    fieldPath: '', 
    jsonixName: ''
  },
  contentstatus: {
    typename: 'TYPE_CONTENT_STATUS', 
    isExt: false, 
    fieldPath: '', 
    jsonixName: ''
  },
  filetype: {
    typename: 'TYPE_FILE_TYPE', 
    isExt: false, 
    fieldPath: '', 
    jsonixName: ''
  },
  documentnumbertype: {
    typename: 'EXTENSION_TYPE_DOCUMENT_NUMBER_TYPE', 
    isExt: false, 
    fieldPath: '', 
    jsonixName: ''
  },

  referencetype:{typename: 'TYPE_REFERENCE_TYPE', isExt: false, fieldPath: '', jsonixName: ''},

  tocowner: {typename: 'EXTENSION_TYPE_TOC_OWNER', isExt: true, fieldPath: '', jsonixName: ''}


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