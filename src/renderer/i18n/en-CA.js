import {elements, attributes, types} from '../../constants/names.js';

export default {
  add: 'Add',
  any: 'Any',
  apptitle: 'eDossier Builder',
  back: 'Back',
  cancel: 'Cancel',
  city: 'City',
  clear: 'Clear',
  closed: 'Closed',
  confirm: 'okay',
  created: 'Created',
  delete: 'Delete',
  edit: 'Edit',
  english: 'English',
  filter: 'Filter',
  forward: 'Forward',
  french: 'French',
  generatepid: 'Generate PID',
  german: 'German',
  help: 'Help',
  home: 'Home',
  inprogress: 'In Progress',
  japanese: 'Japanese',
  language: 'Language | Languages',
  lastmodified: 'Last Modified',
  manageApplication: 'Manage Application Data',
  manageDossier: 'Manage Dossier | Manage Dossiers',
  noitems: 'There are currently no items. Create a new one to begin.',
  open: 'Open',
  packaged: 'Packaged',
  pageleft: 'Previous',
  pageright: 'Next',
  path: 'Path | Paths',
  picklist: 'Picklist | Picklists',
  requireoneitem: 'Must provide at least one value',
  revert: 'Revert',
  rows: 'Rows',
  save: 'Save',
  search: 'Search',
  sent: 'Sent',
  setting: 'Setting | Settings',
  sort: 'Sort',
  status: 'Status',
  tableofcontents: 'Table Of Contents',
  title: 'Title',
  view: 'View',

  ADD_ITEM_FAILURE: 'Failed to add new item',
  ADD_RECEIVER: 'Add a new Receiver to begin',
  BUILD_VERSION: 'Build',
  CANNOT_ADD_SUBMISSION_DOSSIER_CLOSED: 'Cannot add a Submission to a closed Dossier',
  CANNOT_ADD_SUBMISSION_NON_SENT: 'A new Submission can only be added to a Dossier if the highest-numbered (latest) Submission has a Status of Sent',
  CANNOT_DELETE_DOSSIER: 'Cannot delete a Dossier that has packaged or sent submissions',
  CANNOT_DELETE_SUBMISSION: 'Cannot delete a Submission that has been Sent',
  CANNOT_EDIT_SUBMISSION: 'Can only edit a Submission that has been packaged',
  CANNOT_OPEN_SENT_OR_PACKAGED: 'Cannot open a packaged or sent Submission',
  CANNOT_VIEW: 'Cannot view a submission that hasn\'t been Packaged or Sent',
  CONFIRM_DELETE_SUBMISSION: 'Are you sure you want to delete this submission?',
  CONFIRM_DELETE_DOSSIER: 'Are you sure you want to delete this dossier?',
  CREATE_SUBMISSION_FAILURE: 'Error creating new Submission',
  DISCARD_CHANGES: 'You have unsaved changes. Discard?',
  DOSSIER_CLOSED: 'Cannot add a Submission to a closed Dossier',
  DOSSIER_STATUS: 'Dossier Status',
  DUPLICATE_DOCUMENTS: 'Duplicate documents',
  DUPLICATE_DOSSIERS: 'Duplicate dossiers',
  DUPLICATE_ITEM: 'Duplicate items',
  ERROR_DELETING_SUBMISSION: 'There was error deleting the Submission',
  ERROR_OPENING_VIEWER: 'There was an error opening the viewer',
  ERROR_UPDATING_DOSSIER: 'There was an error updating the dossier',
  FILE_SOURCE: 'File Source',
  FULL: 'Full',
  INVALID_PID: 'Invalid PID',
  MISSING_DOSSIER_FIELDS: 'You must fill in the required fields',
  NO_DOSSIER_SELECTED: 'Select a Dossier to review Submissions',
  NON_SENT_SUBMISSION: '',
  OPEN: 'Open',
  OPEN_VIEWER: 'Open packaged submission in Viewer? The viewer must be closed to load properly.',
  PACKAGE: 'Package',
  PACKAGE_LOCATION: 'Package Location',
  PACKAGE_SUCCESS: 'Package created at: ',
  PACKAGE_TYPE: 'Package Type',
  PID_PREFIX: 'PID Prefix',
  REFERENCE_IDENTIFIER: 'Reference Identifier',
  REGULATORY_AUTHORITIES: 'Regulatory Authorities',
  REGULATORY_AUTHORITY_DOCUMENT_INFORMATION: 'Regulatory Authority Document Information',
  REGULATORY_AUTHORITY_DOSSIER_TYPE: 'Regulatory Authority Dossier Types',
  REGULATORY_AUTHORITY_FILE_INFORMATION: 'Regulatory Authority File Information',
  REGULATORY_AUTHORITY_PRODUCT_INFORMATION: 'Regulatory Authority Product Information',
  REGULATORY_AUTHORITY: 'Regulatory Authority',
  REGULATORY_CONTENTS: 'Regulatory Contents',
  REQUIRED: 'Required',
  SAVE_FAILURE: 'Save failed',
  SAVE_SUCCESS: 'Save successful',
  SEARCH_TREE: 'Search Tree',
  SELECT_RECEIVER: 'Select a Receiver to review Senders',
  SENT: 'Sent',
  SUBMISSION_STATUS: 'Submission Status',
  TOC_DATA: 'Show TOC Data',
  UNENTERED_CHIP: 'You must press the ENTER key to complete entry of the chip.',
  UPDATE_FAILURE: 'Update failure',
  UPDATE_SUCCESS: 'Update successful',
  VALID_WEBSITE: 'Must be a valid website',
  VALIDATE: 'Validate',
  VALIDATION_ERROR: 'Validation Error',
  VALIDATION_SUCCESS: 'Validation Successful!',

  legalentities: 'Legal Entity | Legal Entities',

  [elements.ADMIN_NUMBER]: 'Admin Number',
  adminnumbers: 'Admin Numbers',
  [elements.ADMIN_NUMBER_TYPE]: 'Admin Number Type',
  [elements.ALREADY_SUBMITTED]: 'Already Submitted',
  [elements.APPLICATION_TYPE]: 'Application Type',
  [elements.CBI_DESIGNATION]: 'CBI Designation',
  [elements.CITY]: 'City',
  [elements.COMPANY_CONTACT_REGULATORY_ROLE]: 'Company Contact Regulatory Role',
  [elements.COMPLETE_DOCUMENT_SOURCE]: 'Complete Document Source',
  [elements.CONTACT_ADDRESS]: 'Contact Address',
  [elements.CONTACT_PERSON]: 'Contact Person',
  contactpersons: 'Contact Persons',
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
  documentnumbers: 'Document Numbers',
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
  dossiers: 'Dossiers',
  [elements.DOSSIER_COMP_ID]: 'Company Dossier ID',
  [elements.DOSSIER_CONTEXT]: 'Dossier Context',
  dossiercontexts: 'Dossier Contexts',
  [elements.DOSSIER_DESCRIPTION_TITLE]: 'Dossier Title',
  [elements.DOSSIER_NUMBER]: 'Dossier Number',
  [elements.DOSSIER_PID]: 'Dossier PID',
  [elements.DOSSIER_RA]: 'Dossier RA',
  [elements.EMAIL]: 'Email',
  [elements.EMPTY_NODE]: 'Empty Node',
  [elements.FAX]: 'Fax',
  [elements.FILE]: 'File',
  selectfile: 'Select File',
  [elements.FILE_COMMENT]: 'File Comment',
  [elements.FILE_COMPANY_ID]: 'Company File ID',
  [elements.FILE_CONTENT_STATUS]: 'File Content Status',
  [elements.FILE_GENERIC]: 'File Generic',
  [elements.FILENAME]: 'Submission File Name',
  [elements.FILE_PID]: 'File PID',
  [elements.FILE_RA]: 'File RA',
  [elements.FILES]: 'Files',
  [elements.FILE_TYPE]: 'File Type',
  [elements.FIRSTNAME]: 'First Name',
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
  [elements.LASTNAME]: 'Last Name',
  [elements.LEGAL_ENTITIES]: 'Legal Entities',
  [elements.LEGAL_ENTITY]: 'Legal Entity',
  [elements.LEGALENTITY_IDENTIFIER]: 'Legal Entity Identifier',
  legalentityidentifiers: 'Legal Entity Identifiers',
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
  othernationalguidelines: 'Other National Guidelines',
  [elements.PHONE]: 'Phone',
  [elements.PRODUCT]: 'Product',
  products: 'Products',
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
  referenceddocuments: 'Referenced Documents',
  [elements.REFERENCED_DOSSIER]: 'Referenced Dossier',
  referenceddossiers: 'Referenced Dossiers',
  [elements.REFERENCED_DOSSIER_NUMBER]: 'Referenced Dossier Number',
  [elements.REFERENCED_DOSSIER_REASON]: 'Referenced Dossier Reason',
  [elements.REFERENCED_TO_FILE]: 'Referenced To File',
  referencedtofiles: 'Referenced To Files',
  [elements.REFERENCE_TYPE]: 'Reference Type',
  [elements.REGULATORY_TYPE]: 'Regulatory Type',
  [elements.RELATED_TO_SUBSTANCE]: 'Related To Substance',
  relatedtosubstances: 'Related To Substances',
  [elements.REMARK]: 'Remark',
  [elements.REPLACED_DOCUMENT_PID]: 'Replaced Document PID',
  [elements.REPLACED_FILE_PID]: 'Replaced File PID',
  [elements.ROLE]: 'Role',
  [elements.SENDER]: 'Sender',
  senders: 'Senders',
  [elements.SHORT_NAME]: 'Short Name',
  [elements.STANDARD_TOC_PID]: 'Standard TOC PID',
  [elements.STANDARD_TOC_REFERENCE]: 'Standard TOC Reference',
  [elements.STATE]: 'State/Province',
  [elements.STREET1]: 'Street 1',
  [elements.STREET2]: 'Street 2',
  [elements.STRUCTURE]: 'Structure',
  [elements.SUBMISSION]: 'Submission',
  submissions: 'Submissions',
  [elements.SUBMISSION_NUMBER]: 'Submission Number',
  [elements.SUBMISSION_TITLE]: 'Submission Title',
  [elements.SUBMISSION_VERSION_DATE]: 'Submission Version Date',
  [elements.SUBSTANCE]: 'Substance',
  [elements.SUBSTANCE_IDENTIFIER]: 'Substance Identifier',
  substanceidentifiers: 'Substance Identifiers',
  [elements.SUBSTANCE_IDENTIFIER_TYPE]: 'Substance Identifier Type',
  [elements.SUBSTANCE_NAME]: 'Substance Name',
  [elements.SUBSTANCE_PID]: 'Substance PID',
  [elements.SUBSTANCES]: 'Substances',
  [elements.TESTED_ON_VERTEBRATE]: 'Tested On Vertebrate',
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
  [elements.VALUE_DECODE]: 'Display Value',
  [elements.WEBSITE]: 'Website (must include prefix “http://” or “https://")',
  [elements.ZIPCODE]: 'Zip/Postal Code',
  [attributes.ID]: 'ID',
  [attributes.SPECIFICATION_NUMBER]: 'Specification Number',
  [attributes.SUBMISSION_NUMBER]: 'Submission Number',
  [attributes.TO_DOCUMENT_ID]: 'To Document ID',
  [attributes.TO_FILE_ID]: 'File Name',
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
  [types.TYPE_METADATA_STATUS]: 'Metadata Status',
  [types.TYPE_NODE_ASSIGNMENT_STATUS]: 'Node Assignment Status',
  [types.TYPE_RA_DOCUMENT_NUMBER_TYPE]: 'Regulatory Authority Document Number Type',
  [types.TYPE_REFERENCE_TYPE]: 'Reference Type',
  [types.TYPE_REGULATORY_TYPE]: 'Regulatory Type',
  [types.TYPE_SUBSTANCE_IDENTIFIER_TYPE]: 'Substance Identifier Type',
  [types.TYPE_TOC_OWNER]: 'TOC Owner',
  [types.TYPE_UNIT]: 'Unit',
};
