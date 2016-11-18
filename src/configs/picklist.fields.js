const PicklistFieldsConfig = {
  metadatastatus: {typename: 'TYPE_METADATA_STATUS', isExt: false},
  adminnumbertype: {typename: 'EXTENSION_TYPE_ADMIN_NUMBER_TYPE', isExt: true},
  regulatorytype: {typename: 'EXTENSION_TYPE_REGULATORY_TYPE', isExt: true},
  applicationtype: {typename: 'EXTENSION_TYPE_APPLICATION_TYPE', isExt: true},
  formulationtype: {typename: 'EXTENSION_TYPE_FORMULATION_TYPE', isExt: true},
  unit: {typename: 'EXTENSION_TYPE_UNIT', isExt: true},
  substanceidentifiertype: { typename: 'EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE', isExt: true}
};

(function (exports) {
  let keys = Object.keys(PicklistFieldsConfig); 

  keys.map(key => {
    exports[key] = PicklistFieldsConfig[key];
  });
})(typeof exports === 'undefined' ? this['PicklistFieldsConfig'] = {} : exports);