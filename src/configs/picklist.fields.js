const PicklistFieldsConfig = {
  METADATA_STATUS: {typename: 'TYPE_METADATA_STATUS', isExt: false},
  ADMIN_NUMBER_TYPE: {typename: 'EXTENSION_TYPE_ADMIN_NUMBER_TYPE', isExt: true},
  SUBSTANCE_IDENTIFIER_TYPE: { typename: 'EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE', isExt: true}
};

(function (exports) {
  let keys = Object.keys(PicklistFieldsConfig); 

  keys.map(key => {
    exports[key] = PicklistFieldsConfig[key];
  });
})(typeof exports === 'undefined' ? this['PicklistFieldsConfig'] = {} : exports);
