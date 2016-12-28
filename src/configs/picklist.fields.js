const PicklistFieldsConfig = {
  metadatastatus: {typename: 'TYPE_METADATA_STATUS', isExt: false},
  adminnumbertype: {typename: 'EXTENSION_TYPE_ADMIN_NUMBER_TYPE', isExt: true},
  regulatorytype: {typename: 'EXTENSION_TYPE_REGULATORY_TYPE', isExt: true},
  applicationtype: {typename: 'EXTENSION_TYPE_APPLICATION_TYPE', isExt: true},
  formulationtype: {typename: 'EXTENSION_TYPE_FORMULATION_TYPE', isExt: true},
  unit: {typename: 'EXTENSION_TYPE_UNIT', isExt: true},
  legalentitytype: {typename: 'EXTENSION_TYPE_LEGALENTITY_TYPE', isExt: true},
  country: {typename: 'EXTENSION_TYPE_COUNTRY', isExt: true},
  substanceidentifiertype: { typename: 'EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE', isExt: true},
  contentstatus: {typename: 'TYPE_CONTENT_STATUS', isExt: false},
  filetype: {typename: 'TYPE_FILE_TYPE', isExt: false},
  documentnumbertype: {typename: 'EXTENSION_TYPE_DOCUMENT_NUMBER_TYPE', isExt: false},

  referencetype:{typename: 'TYPE_REFERENCE_TYPE', isExt: false}

  tocowner: {typename: 'EXTENSION_TYPE_TOC_OWNER', isExt: true}


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