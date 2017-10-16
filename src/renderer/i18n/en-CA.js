import {elements, attributes, types} from '../../constants/names.js';

export default {
  pageleft: 'Page Left',
  pageright: 'Page Right',
  delete: 'Delete',
  view: 'View',
  edit: 'Edit',
  add: 'Add',
  any: 'Any',
  apptitle: 'eDossier Builder',
  back: 'Back',
  city: 'City',
  clear: 'Clear',
  created: 'Created',
  english: 'English',
  filter: 'Filter',
  forward: 'Forward',
  french: 'French',
  generatepid: 'Generate PID',
  german: 'German',
  help: 'Help',
  home: 'Home',
  japanese: 'Japanese',
  language: 'Language | Languages',
  lastmodified: 'Last Modified',
  manageApplication: 'Manage Application Data',
  manageDossier: 'Manage Dossier | Manage Dossiers',
  noitems: 'There are no items. Create a new one to begin',
  requireoneitem: 'Must provide at least one value',
  path: 'Path | Paths',
  picklist: 'Picklist | Picklists',
  revert: 'Revert',
  save: 'Save',
  search: 'Search',
  setting: 'Setting | Settings',
  tableofcontents: 'Table Of Contents',
  title: 'Title',
  confirm: 'okay',
  cancel: 'cancel',

  ADD_TO_BEGIN: 'Add a new Receiver to begin',
  ADD_ITEM_FAILURE: 'Failed to add new item',
  DISCARD_CHANGES: 'You have unsaved changes. Discard?',
  DUPLICATE_ITEM: 'Duplicate items',
  FILE_SOURCE: 'File Source',
  MISSING_DOSSIER_FIELDS: 'You must fill in the required fields',
  NO_DOSSIER_SELECTED: 'Select a Dossier to review Submissions',
  REGULATORY_CONTENTS: 'Regulatory Contents',
  SAVE_SUCCESS: 'Save successful',
  SAVE_FAILURE: 'Save failed',
  SEARCH_TREE: 'Search Tree',
  SELECT_TO_BEGIN: 'Select a Receiver to Review Senders',
  TOC_DATA: 'TOC Data',
  UPDATE_SUCCESS: 'Update successful',
  UPDATE_FAILURE: 'Update failure',
  REGULATORY_AUTHORITY: 'Regulatory Authority',
  REGULATORY_AUTHORITIES: 'Regulatory Authorities',
  REGULATORY_AUTHORITY_DOSSIER_TYPE: 'Regulatory Authority Dossier Type',
  REGULATORY_AUTHORITY_FILE_INFORMATION: 'Regulatory Authority File Information',
  REGULATORY_AUTHORITY_DOCUMENT_INFORMATION: 'Regulatory Authority Document Information',

  [elements.ADMIN_NUMBER]: 'Admin Number',
  [elements.ADMIN_NUMBER_TYPE]: 'Admin Number Type',
  [elements.ALREADY_SUBMITTED]: 'Already Submitted',
  [elements.APPLICATION_TYPE]: 'Application Type',
  [elements.CBI_DESIGNATION]: 'CBI Designation',
  [elements.CITY]: 'City',
  [elements.COMPANY_CONTACT_REGULATORY_ROLE]: 'Company Contact Regulatory Role',
  [elements.COMPLETE_DOCUMENT_SOURCE]: 'Complete Document Source',
  [elements.CONTACT_ADDRESS]: 'Contact Address',
  [elements.CONTACT_PERSON]: 'Contact Person',
  [elements.COUNTRY]: 'Country',
  [elements.DATA_PROTECTION]: 'Data Protection',
  [elements.DATA_REQUIREMENT]: 'Data Requirement',
  [elements.DEPARTMENT]: 'Department',
  [elements.DOCUMENT]: 'Document',
  [elements.DOCUMENT_AUTHOR]: 'Document Author',
  [elements.DOCUMENT_COMMENT]: 'Document Comment',
  [elements.DOCUMENT_COMPANY_ID]: 'Document Company ID',
  [elements.DOCUMENT_CONTENT_STATUS]: 'Document Content Status',
  [elements.DOCUMENT_CONTENT_STATUS_HISTORY]: 'Document Content Status History',
  [elements.DOCUMENT_FAMILY]: 'Document Family',
  [elements.DOCUMENT_FAMILY_PID]: 'Document Family PID',
  [elements.DOCUMENT_GENERIC]: 'Document Generic',
  [elements.DOCUMENT_ISSUE]: 'Document Issue',
  [elements.DOCUMENT_ISSUE_DATE]: 'Document Issue Date',
  [elements.DOCUMENT_NUMBER]: 'Document Number',
  [elements.DOCUMENT_NUMBER_TYPE]: 'Document Number Type',
  [elements.DOCUMENT_OWNER]: 'Document Owner',
  [elements.DOCUMENT_PAGES]: 'Document Pages',
  [elements.DOCUMENT_PID]: 'Document PID',
  [elements.DOCUMENT_RA]: 'Document RA',
  [elements.DOCUMENTS]: 'Documents',
  [elements.DOCUMENT_SOURCE]: 'Document Source',
  [elements.DOCUMENT_TITLE]: 'Document Title',
  [elements.DOCUMENT_VOLUME]: 'Document Volume',
  [elements.DOCUMENT_YEAR]: 'Document Year',
  [elements.DOSSIER]: 'Dossier',
  [elements.DOSSIER_COMP_ID]: 'Dossier Company Id',
  [elements.DOSSIER_CONTEXT]: 'Dossier Context',
  [elements.DOSSIER_DESCRIPTION_TITLE]: 'Dossier Title',
  [elements.DOSSIER_NUMBER]: 'Dossier Number',
  [elements.DOSSIER_PID]: 'Dossier PID',
  [elements.DOSSIER_RA]: 'Dossier RA',
  [elements.EMAIL]: 'Email',
  [elements.EMPTY_NODE]: 'Empty Node',
  [elements.FAX]: 'Fax',
  [elements.FILE]: 'File',
  [elements.FILE_COMMENT]: 'File Comment',
  [elements.FILE_COMPANY_ID]: 'File Company ID',
  [elements.FILE_CONTENT_STATUS]: 'File Content Status',
  [elements.FILE_GENERIC]: 'File Generic',
  [elements.FILENAME]: 'Filename',
  [elements.FILE_PID]: 'File PID',
  [elements.FILE_RA]: 'File RA',
  [elements.FILES]: 'Associated Files',
  [elements.FILE_TYPE]: 'Files Type',
  [elements.FIRSTNAME]: 'Firstname',
  [elements.FORMAT_COMMENT]: 'Format Comment',
  [elements.FORMULATION_TYPE]: 'Formulation Type',
  [elements.GENERIC_PRODUCT_NAME]: 'Generic Product Name',
  [elements.GHSTS]: 'Ghsts',
  [elements.GUIDELINE_NUMBER]: 'Guideline Number',
  [elements.GUIDELINE_SYSTEM]: 'Guideline System',
  [elements.GXP_INDICATOR]: 'GXP Indicator',
  [elements.IDENTIFIER]: 'Identifier',
  [elements.INCREMENTAL]: 'Incremental',
  [elements.INGREDIENT]: 'Ingredient',
  [elements.INGREDIENTS]: 'Ingredients',
  [elements.INTERNAL]: 'Internal',
  [elements.LASTNAME]: 'Lastname',
  [elements.LEGAL_ENTITIES]: 'Legal Entities',
  [elements.LEGAL_ENTITY]: 'Legal Entity',
  [elements.LEGALENTITY_IDENTIFIER]: 'Legal Entity Identifier',
  [elements.LEGALENTITY_IDENTIFIER_TYPE]: 'Legal Entity Identifier Type',
  [elements.LEGALENTITY_NAME]: 'Legal Entity Name',
  [elements.LEGALENTITY_PID]: 'Legal Entity PID',
  [elements.LEGALENTITY_TYPE]: 'Legal Entity Type',
  [elements.LOGICAL_DELETED]: 'Logical Deleted',
  [elements.MD5CHECKSUM]: 'MD5 Checksum',
  [elements.METADATA_STATUS]: 'Metadata Status',
  [elements.MOBILE]: 'Mobile',
  [elements.NODE_ASSIGNMENT_STATUS]: 'Node Assignment Status',
  [elements.NODE_HEADING]: 'Node Heading',
  [elements.NODE_NAME]: 'Node Name',
  [elements.ORGANISATION]: 'Organisation',
  [elements.OTHER_NAME]: 'Other Name',
  [elements.OTHER_NATIONAL_GUIDELINE]: 'Other National Guideline',
  [elements.PHONE]: 'Phone',
  [elements.PRODUCT]: 'Product',
  [elements.PRODUCT_NAME]: 'Product Name',
  [elements.PRODUCT_PID]: 'Product PID',
  [elements.PRODUCT_RA]: 'Product RA',
  [elements.PROJECT_ID_NUMBER]: 'Project ID Number',
  [elements.PUBLISHED_INDICATOR]: 'Published Indicator',
  [elements.QUANTITY]: 'Quantity',
  [elements.RA_DOCUMENT_NUMBER]: 'RA Document Number',
  [elements.RA_DOCUMENT_NUMBER_TYPE]: 'RA Document Number Type',
  [elements.RECEIVER]: 'Receiver',
  [elements.RECEIVERS]: 'Receivers',
  [elements.REFERENCED_DOCUMENT]: 'Referenced Document',
  [elements.REFERENCED_DOSSIER]: 'Referenced Dossier',
  [elements.REFERENCED_DOSSIER_NUMBER]: 'Referenced Dossier Number',
  [elements.REFERENCED_DOSSIER_REASON]: 'Referenced Dossier Reason',
  [elements.REFERENCED_TO_FILE]: 'Referenced To File',
  [elements.REFERENCE_TYPE]: 'Reference Type',
  [elements.REGULATORY_TYPE]: 'Regulatory Type',
  [elements.RELATED_TO_SUBSTANCE]: 'Related To Substance',
  [elements.REMARK]: 'Remark',
  [elements.REPLACED_DOCUMENT_PID]: 'Replaced Document PID',
  [elements.REPLACED_FILE_PID]: 'Replaced File PID',
  [elements.ROLE]: 'Role',
  [elements.SENDER]: 'Sender',
  [elements.SHORT_NAME]: 'Short Name',
  [elements.STANDARD_TOC_PID]: 'Standard TOC PID',
  [elements.STANDARD_TOC_REFERENCE]: 'Standard TOC Reference',
  [elements.STATE]: 'State',
  [elements.STREET1]: 'Street 1',
  [elements.STREET2]: 'Street 2',
  [elements.STRUCTURE]: 'Structure',
  [elements.SUBMISSION]: 'Submission',
  [elements.SUBMISSION_NUMBER]: 'Submission Number',
  [elements.SUBMISSION_TITLE]: 'Submission Title',
  [elements.SUBMISSION_VERSION_DATE]: 'Submission Version Date',
  [elements.SUBSTANCE]: 'Substance',
  [elements.SUBSTANCE_IDENTIFIER]: 'Substance Identifier',
  [elements.SUBSTANCE_IDENTIFIER_TYPE]: 'Substance Identifier Type',
  [elements.SUBSTANCE_NAME]: 'Substance Name',
  [elements.SUBSTANCE_PID]: 'Substance PID',
  [elements.SUBSTANCES]: 'Substances',
  [elements.TESTED_ON_VERTEBRATE]: 'Tested On Vertebrates',
  [elements.TEST_LABORATORY]: 'Test Laboratory',
  [elements.TITLE]: 'Title',
  [elements.TOC]: 'TOC',
  [elements.TOC2DOC]: 'TOC Node to Document PID',
  [elements.TOC_FULL_NAME]: 'TOC Full Name',
  [elements.TOC_NODE]: 'TOC Node',
  [elements.TOC_NODE_PID]: 'TOC Node PID',
  [elements.TOC_OWNER]: 'TOC Owner',
  [elements.TOC_SHORT_NAME]: 'TOC Short Name',
  [elements.TOC_VERSION]: 'TOC Version',
  [elements.USED_TEMPLATES]: 'Used Templates',
  [elements.UNIT]: 'Unit',
  [elements.VALUE]: 'Value',
  [elements.VALUE_DECODE]: 'Value Decode',
  [elements.WEBSITE]: 'Website',
  [elements.ZIPCODE]: 'Zipcode',
  [attributes.ID]: 'ID',
  [attributes.SPECIFICATION_NUMBER]: 'Specification Number',
  [attributes.SUBMISSION_NUMBER]: 'Submission Number',
  [attributes.TO_DOCUMENT_ID]: 'To Document ID',
  [attributes.TO_FILE_ID]: 'To File ID',
  [attributes.TO_LEGAL_ENTITY_ID]: 'To Legal Entity ID',
  [attributes.TO_SPECIFIC_FOR_RA]: 'Regulatory Authority',
  [attributes.TO_SUBSTANCE_ID]: 'Substance',
  [types.EXTENSION_TYPE_ADMIN_NUMBER_TYPE]: 'Admin Number Type',
  [types.EXTENSION_TYPE_APPLICATION_TYPE]: 'Application Type',
  [types.EXTENSION_TYPE_COUNTRY]: 'Country',
  [types.EXTENSION_TYPE_DOCUMENT_NUMBER_TYPE]: 'Document Number Type',
  [types.EXTENSION_TYPE_FORMULATION_TYPE]: 'Formulation Type',
  [types.EXTENSION_TYPE_LEGALENTITY_IDENTIFIER_TYPE]: 'Legal Entity Identifier Type',
  [types.EXTENSION_TYPE_LEGALENTITY_TYPE]: 'Legal Entity Type',
  [types.EXTENSION_TYPE_RA_DOCUMENT_NUMBER_TYPE]: 'RA Document Number Type',
  [types.EXTENSION_TYPE_REGULATORY_TYPE]: 'Regulatory Type',
  [types.EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE]: 'Substance Identifier Type',
  [types.EXTENSION_TYPE_TOC_OWNER]: 'TOC Owner',
  [types.EXTENSION_TYPE_UNIT]: 'Unit',
  [types.TYPE_ADMIN_NUMBER_TYPE]: 'Admin Number Type',
  [types.TYPE_APPLICATION_TYPE]: 'Application Type',
  [types.TYPE_COUNTRY]: 'Country',
  [types.TYPE_DATA_PROTECTION]: 'Data Protection',
  [types.TYPE_DATA_REQUIREMENT]: 'Data Requirement',
  [types.TYPE_DOCUMENT_CONTENT_STATUS]: 'Document Content Status',
  [types.TYPE_DOCUMENT_NUMBER_TYPE]: 'Document Number Type',
  [types.TYPE_FILE_TYPE]: 'File Type',
  [types.TYPE_FORMULATION_TYPE]: 'Formulation Type',
  [types.TYPE_LEGALENTITY_IDENTIFIER_TYPE]: 'Legal Entity Identifier Type',
  [types.TYPE_LEGALENTITY_TYPE]: 'Legal Entity Type',
  [types.TYPE_METADATA_STATUS]: 'Metadata Status Type',
  [types.TYPE_NODE_ASSIGNMENT_STATUS]: 'Node Assignment Status',
  [types.TYPE_RA_DOCUMENT_NUMBER_TYPE]: 'RA Document Number Type',
  [types.TYPE_REFERENCE_TYPE]: 'Reference Type',
  [types.TYPE_REGULATORY_TYPE]: 'Regulatory Type',
  [types.TYPE_SUBSTANCE_IDENTIFIER_TYPE]: 'Substance Identifier Type',
  [types.TYPE_TOC_OWNER]: 'TOC Owner',
  [types.TYPE_UNIT]: 'Unit Type',
};
