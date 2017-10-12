/**
 * @alexgagnon
 * This file contains the mappings between the standard (schema), and the
 * properties used in the application (i.e. those used as keys in the object
 * once the XML -> JSON -> JS conversion is completed). These mappings are also
 * used as the keys for the i18n translations. See src/renderer/i18n/*
 */

const elements = {
  ADMIN_NUMBER: 'adminnumber',
  ADMIN_NUMBER_TYPE: 'adminnumbertype',
  ALREADY_SUBMITTED: 'alreadysubmitted',
  APPLICATION_TYPE: 'applicationtype',
  CBI_DESIGNATION: 'cbidesignation',
  CITY: 'city',
  COMPANY_CONTACT_REGULATORY_ROLE: 'companycontactregulatoryrole',
  COMPLETE_DOCUMENT_SOURCE: 'completedocumentsource',
  CONTACT_ADDRESS: 'contactaddress',
  CONTACT_PERSON: 'contactperson',
  COUNTRY: 'country',
  DATA_PROTECTION: 'dataprotection',
  DATA_REQUIREMENT: 'datarequirement',
  DEPARTMENT: 'department',
  DOCUMENT: 'document',
  DOCUMENT_AUTHOR: 'documentauthor',
  DOCUMENT_COMMENT: 'documentcomment',
  DOCUMENT_COMPANY_ID: 'documentcompanyid',
  DOCUMENT_CONTENT_STATUS: 'documentcontentstatus',
  DOCUMENT_CONTENT_STATUS_HISTORY: 'documentcontentstatushistory',
  DOCUMENT_FAMILY: 'documentfamily',
  DOCUMENT_FAMILY_PID: 'documentfamilypid',
  DOCUMENT_GENERIC: 'documentgeneric',
  DOCUMENT_ISSUE: 'documentissue',
  DOCUMENT_ISSUE_DATE: 'documentissuedate',
  DOCUMENT_NUMBER: 'documentnumber',
  DOCUMENT_NUMBER_TYPE: 'documentnumbertype',
  DOCUMENT_OWNER: 'documentowner',
  DOCUMENT_PAGES: 'documentpages',
  DOCUMENT_PID: 'documentpid',
  DOCUMENT_RA: 'documentra',
  DOCUMENTS: 'documents',
  DOCUMENT_SOURCE: 'documentsource',
  DOCUMENT_TITLE: 'documenttitle',
  DOCUMENT_VOLUME: 'documentvolume',
  DOCUMENT_YEAR: 'documentyear',
  DOSSIER: 'dossier',
  DOSSIER_COMP_ID: 'dossiercompid',
  DOSSIER_CONTEXT: 'dossiercontext',
  DOSSIER_DESCRIPTION_TITLE: 'dossierdescriptiontitle',
  DOSSIER_NUMBER: 'dossiernumber',
  DOSSIER_PID: 'dossierpid',
  DOSSIER_RA: 'dossierra',
  EMAIL: 'email',
  EMPTY_NODE: 'emptynode',
  FAX: 'fax',
  FILE: 'file',
  FILE_COMMENT: 'filecomment',
  FILE_COMPANY_ID: 'filecompanyid',
  FILE_CONTENT_STATUS: 'filecontentstatus',
  FILE_GENERIC: 'filegeneric',
  FILENAME: 'filename',
  FILE_PID: 'filepid',
  FILE_RA: 'filera',
  FILES: 'files',
  FILE_TYPE: 'filetype',
  FIRSTNAME: 'firstname',
  FORMAT_COMMENT: 'formatcomment',
  FORMULATION_TYPE: 'formulationtype',
  GENERIC_PRODUCT_NAME: 'genericproductname',
  GHSTS: 'ghsts',
  GUIDELINE_NUMBER: 'guidelinenumber',
  GUIDELINE_SYSTEM: 'guidelinesystem',
  GXP_INDICATOR: 'gxpindicator',
  IDENTIFIER: 'identifier',
  INCREMENTAL: 'incremental',
  INGREDIENT: 'ingredient',
  INGREDIENTS: 'ingredients',
  INTERNAL: 'internal',
  LASTNAME: 'lastname',
  LEGAL_ENTITIES: 'legalentities',
  LEGAL_ENTITY: 'legalentity',
  LEGALENTITY_IDENTIFIER: 'legalentitytidentifier',
  LEGALENTITY_IDENTIFIER_TYPE: 'legalentityidentifiertype',
  LEGALENTITY_NAME: 'legalentityname',
  LEGALENTITY_PID: 'legalentitypid',
  LEGALENTITY_TYPE: 'legalentitytype',
  LOGICAL_DELETED: 'logicaldeleted',
  MD5CHECKSUM: 'md5checksum',
  METADATA_STATUS: 'metadatastatus',
  MOBILE: 'mobile',
  NODE_ASSIGNMENT_STATUS: 'nodeassignmentstatus',
  NODE_HEADING: 'nodeheading',
  NODE_NAME: 'nodename',
  ORGANISATION: 'organisation',
  OTHER_NAME: 'othername',
  OTHER_NATIONAL_GUIDELINE: 'othernationalguideline',
  PHONE: 'phone',
  PRODUCT: 'product',
  PRODUCT_NAME: 'productname',
  PRODUCT_PID: 'productpid',
  PRODUCT_RA: 'productra',
  PROJECT_ID_NUMBER: 'projectidnumber',
  PUBLISHED_INDICATOR: 'publishedindicator',
  QUANTITY: 'quantity',
  RA_DOCUMENT_NUMBER: 'radocumentnumber',
  RA_DOCUMENT_NUMBER_TYPE: 'radocumentnumbertype',
  RECEIVER: 'receiver',
  RECEIVERS: 'receivers',
  REFERENCED_DOCUMENT: 'referenceddocument',
  REFERENCED_DOSSIER: 'referenceddossier',
  REFERENCED_DOSSIER_NUMBER: 'referenceddossiernumber',
  REFERENCED_DOSSIER_REASON: 'referenceddossierreason',
  REFERENCED_TO_FILE: 'referencedtofile',
  REFERENCE_TYPE: 'referencetype',
  REGULATORY_TYPE: 'regulatorytype',
  RELATED_TO_SUBSTANCE: 'relatedtosubstance',
  REMARK: 'remark',
  REPLACED_DOCUMENT_PID: 'replaceddocumentpid',
  REPLACED_FILE_PID: 'replacedfilepid',
  ROLE: 'role',
  SENDER: 'sender',
  SHORT_NAME: 'shortname',
  STANDARD_TOC_PID: 'standardtocpid',
  STANDARD_TOC_REFERENCE: 'standardtocreference',
  STATE: 'state',
  STREET1: 'street1',
  STREET2: 'street2',
  STRUCTURE: 'structure',
  SUBMISSION: 'submission',
  SUBMISSION_NUMBER: 'submissionnumber',
  SUBMISSION_TITLE: 'submissiontitle',
  SUBMISSION_VERSION_DATE: 'submissionversiondate',
  SUBSTANCE: 'substance',
  SUBSTANCE_IDENTIFIER: 'substanceidentifier',
  SUBSTANCE_IDENTIFIER_TYPE: 'substanceidentifiertype',
  SUBSTANCE_NAME: 'substancename',
  SUBSTANCE_PID: 'substancepid',
  SUBSTANCES: 'substances',
  TESTED_ON_VERTEBRATE: 'testedonvertebrate',
  TEST_LABORATORY: 'testlaboratory',
  TITLE: 'title',
  TOC: 'toc',
  TOC2DOC: 'toc2doc',
  TOC_FULL_NAME: 'tocfullname',
  TOC_NODE: 'tocnode',
  TOC_NODE_PID: 'tocnodepid',
  TOC_OWNER: 'tocowner',
  TOC_SHORT_NAME: 'tocshortname',
  TOC_VERSION: 'tocversion',
  UNIT: 'unit',
  USED_TEMPLATES: 'usedtemplates',
  VALUE: 'value',
  VALUE_DECODE: 'valuedecode',
  WEBSITE: 'website',
  ZIPCODE: 'zipcode'
};

const attributes = {
  ID: 'Id',
  SPECIFICATION_NUMBER: 'specificationversion',
  SUBMISSION_NUMBER: 'submissionNumber',
  TO_DOCUMENT_ID: 'toDocumentId',
  TO_FILE_ID: 'toFileId',
  TO_LEGAL_ENTITY_ID: 'toLegalEntityId',
  TO_SPECIFIC_FOR_RA: 'toSpecificForRAId',
  TO_SUBSTANCE_ID: 'toSubstanceId'
};

const urls = {
  [elements.LEGAL_ENTITY]: 'legalentity',
  [elements.SENDER]: 'sender',
  [elements.RECEIVER]: 'receiver',
  [elements.SUBSTANCE]: 'substance',
  [elements.PRODUCT]: 'product',
  [elements.SUBMISSION]: 'submission',
  [elements.DOSSIER]: 'dossier',
  [elements.FILE]: 'file',
  [elements.DOCUMENT]: 'document',
  [elements.TOC]: 'toc'
};

const types = {
  EXTENSION_TYPE_ADMIN_NUMBER_TYPE: 'extensiontypeadminnumbertype',
  EXTENSION_TYPE_APPLICATION_TYPE: 'extensiontypeapplicationtype',
  EXTENSION_TYPE_COUNTRY: 'extensiontypecountry',
  EXTENSION_TYPE_DOCUMENT_NUMBER_TYPE: 'extensiontypedocumentnumbertype',
  EXTENSION_TYPE_FORMULATION_TYPE: 'extensiontypeformulationtype',
  EXTENSION_TYPE_LEGALENTITY_IDENTIFIER_TYPE: 'extensiontypelegalentityidentifiertype',
  EXTENSION_TYPE_LEGALENTITY_TYPE: 'extensiontypelegalentitytype',
  EXTENSION_TYPE_RA_DOCUMENT_NUMBER_TYPE: 'extensiontyperadocumentnumbertype',
  EXTENSION_TYPE_REGULATORY_TYPE: 'extensiontyperegulatorytype',
  EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE: 'extensiontypesubstanceidentifiertype',
  EXTENSION_TYPE_TOC_OWNER: 'extensiontypetocowner',
  EXTENSION_TYPE_UNIT: 'extensiontypeunit',
  TYPE_ADMIN_NUMBER_TYPE: 'adminnumbertype',
  TYPE_APPLICATION_TYPE: 'applicationtype',
  TYPE_COUNTRY: 'country',
  TYPE_DATA_PROTECTION: 'dataprotection',
  TYPE_DATA_REQUIREMENT: 'datarequirement',
  TYPE_DOCUMENT_CONTENT_STATUS: 'documentcontentstatus',
  TYPE_DOCUMENT_NUMBER_TYPE: 'documentnumbertype',
  TYPE_FILE_TYPE: 'filetype',
  TYPE_FORMULATION_TYPE: 'formulationtype',
  TYPE_LEGALENTITY_IDENTIFIER_TYPE: 'legalentityidentifiertype',
  TYPE_LEGALENTITY_TYPE: 'legalentitytype',
  TYPE_METADATA_STATUS: 'metadatastatus',
  TYPE_NODE_ASSIGNMENT_STATUS: 'nodeassignmenttype',
  TYPE_RA_DOCUMENT_NUMBER_TYPE: 'radocumentnumbertype',
  TYPE_REFERENCE_TYPE: 'referencetype',
  TYPE_REGULATORY_TYPE: 'regulatorytype',
  TYPE_SUBSTANCE_IDENTIFIER_TYPE: 'substanceidentifiertype',
  TYPE_TOC_OWNER: 'tocowner',
  TYPE_UNIT: 'unit',
};

export {elements, attributes, urls, types};