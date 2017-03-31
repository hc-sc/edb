export default class Picklist {
  constructor(typename, value, decode, isExt, status, id) {
    if (typename) {
      if (typeof typename === 'object') {
        Object.assign(this, typename);
      } else if (typeof typename === 'string') {
        if (id)
          this.id = id;
        this.TYPE_NAME = typename;
        this.value = value;
        this.valuedecode = decode;
        this.status = status ? status : 'enabled';
        this.isExt = (isExt !== 'undefined') ? isExt : true;
      } else {
        console.log('Error: wrong using of Picklist constructor with Type_Name 1: [' + typename + '] / Value: [' + value + ']');
      }
    } else {
      console.log('Error: wrong using of Picklist constructor with Type_Name 2: [' + typename + '] / Value: [' + value + ']');
    }
  }
}

export const picklistTypes = [
  'EXTENSION_TYPE_ADMIN_NUMBER_TYPE',
  'EXTENSION_TYPE_APPLICATION_TYPE',
  'EXTENSION_TYPE_COUNTRY',
  'TYPE_DATA_PROTECTION',
  'TYPE_DATA_REQUIREMENT',
  'TYPE_DOCUMENT_CONTENT_STATUS',
  'EXTENSION_TYPE_DOCUMENT_NUMBER_TYPE',
  'TYPE_FILE_TYPE',
  'EXTENSION_TYPE_FORMULATION_TYPE',
  'EXTENSION_TYPE_LEGALENTITY_IDENTIFIER_TYPE',
  'EXTENSION_TYPE_LEGALENTITY_TYPE',
  'TYPE_METADATA_STATUS',
  'EXTENSION_TYPE_RA_DOCUMENT_NUMBER_TYPE',
  'TYPE_REFERENCE_TYPE',
  'EXTENSION_TYPE_REGULATORY_TYPE',
  'EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE',
  'TYPE_NODE_ASSIGNMENT_STATUS',
  'EXTENSION_TYPE_TOC_OWNER',
  'EXTENSION_TYPE_UNIT'
];