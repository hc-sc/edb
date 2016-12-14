import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './toc.template';

import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import Tbl from '../common/tbl/tbl.component';
import Tree from '../common/tree/tree.component';

export default angular.module('toc', [
  ngMaterial,
  TextInput,
  SelectInput,
  Tbl,
  Tree
])
.component('toc', {
  template,
  bindings: {
    dossier: '<'
  },
  controller: class TOCCtrl {
    constructor() {
      console.log(this);

      // Structure
      // nodename - name of node
      // nodeheading - annotation
      // logicaldeleted - ?????
      // emptynode - flag for if it's a leaf
      // toc2doc - the documents related to this node
      // tocnode - subnodes for this node

      this.dummy = {
        "TYPE_NAME": "GHSTS.GHSTS.TOC.STRUCTURE",
        "nodename": "TOC",
        "tocnode": [
          {
            "TYPE_NAME": "GHSTS.TYPETOCNODE",
            "nodename": "Document A",
            "nodeheading": "Statement of the context in which the dossier is submitted",
            "logicaldeleted": false,
            "tocnodepid": "urn:node:ID0003773613",
            "emptynode": false
          },
          {
            "TYPE_NAME": "GHSTS.TYPETOCNODE",
            "nodename": "Document B",
            "nodeheading": "Documentation relating to the joint submission of dossiers",
            "logicaldeleted": false,
            "tocnodepid": "urn:node:ID0003773614",
            "emptynode": false
          },
          {
            "TYPE_NAME": "GHSTS.TYPETOCNODE",
            "nodename": "Document C",
            "nodeheading": "Existing or proposed labels",
            "logicaldeleted": false,
            "tocnodepid": "urn:node:ID0003773615",
            "emptynode": false
          },
          {
            "TYPE_NAME": "GHSTS.TYPETOCNODE",
            "nodename": "Document D",
            "nodeheading": "Uses (GAPs and MRLs) on food and feed crops",
            "logicaldeleted": false,
            "tocnodepid": "urn:node:ID0003773616",
            "emptynode": false,
            "tocnode": [
              {
                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                "nodename": "D 1",
                "nodeheading": "Intended uses supported in the EU for which data have been provided",
                "logicaldeleted": false,
                "tocnodepid": "urn:node:ID0003773617",
                "emptynode": false
              },
              {
                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                "nodename": "D 2",
                "nodeheading": "List of currently authorized uses and extent of use",
                "logicaldeleted": false,
                "tocnodepid": "urn:node:ID0003773618",
                "emptynode": false
              },
              {
                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                "nodename": "D 3",
                "nodeheading": "Intended uses supported in the EU for which data will be provided",
                "logicaldeleted": false,
                "tocnodepid": "urn:node:ID0003773619",
                "emptynode": false
              }
            ]
          },
          {
            "TYPE_NAME": "GHSTS.TYPETOCNODE",
            "nodename": "Document E",
            "nodeheading": "MRLs",
            "logicaldeleted": false,
            "tocnodepid": "urn:node:ID0003052895",
            "emptynode": false,
            "tocnode": [
              {
                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                "nodename": "E 1",
                "nodeheading": "Listing of Community and Member States MRLs",
                "logicaldeleted": false,
                "tocnodepid": "urn:node:ID0003052896",
                "emptynode": false
              },
              {
                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                "nodename": "E 2",
                "nodeheading": "Listing of MRLs in exporting countries",
                "logicaldeleted": false,
                "tocnodepid": "urn:node:ID0003052897",
                "emptynode": false
              }
            ]
          },
          {
            "TYPE_NAME": "GHSTS.TYPETOCNODE",
            "nodename": "Document F",
            "nodeheading": "Notification submitted to the Commission",
            "logicaldeleted": false,
            "tocnodepid": "urn:node:ID0003052898",
            "emptynode": false
          },
          {
            "TYPE_NAME": "GHSTS.TYPETOCNODE",
            "nodename": "Document G",
            "nodeheading": "Permission of each formulant in accordance eith EU legislation",
            "logicaldeleted": false,
            "tocnodepid": "urn:node:ID0003052899",
            "emptynode": false
          },
          {
            "TYPE_NAME": "GHSTS.TYPETOCNODE",
            "nodename": "Document H",
            "nodeheading": "Safety data sheets for the formulants",
            "logicaldeleted": false,
            "tocnodepid": "urn:node:ID0003052900",
            "emptynode": false
          },
          {
            "TYPE_NAME": "GHSTS.TYPETOCNODE",
            "nodename": "Document I",
            "nodeheading": "Other data on the formulants",
            "logicaldeleted": false,
            "tocnodepid": "urn:node:ID0003052901",
            "emptynode": false
          },
          {
            "TYPE_NAME": "GHSTS.TYPETOCNODE",
            "nodename": "Document J",
            "nodeheading": "Confidential data and information",
            "logicaldeleted": false,
            "tocnodepid": "urn:node:ID0003052902",
            "emptynode": false,
            "toc2DOC": [
              {
                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                "toDocumentId": "D_Document_J_01_T-423579_0003052902"
              }
            ]
          },
          {
            "TYPE_NAME": "GHSTS.TYPETOCNODE",
            "nodename": "Annex IIA",
            "nodeheading": "Active substance",
            "logicaldeleted": false,
            "tocnodepid": "urn:node:ID0003052903",
            "emptynode": false,
            "tocnode": [
              {
                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                "nodename": "Document KIIA",
                "nodeheading": "Individual test and study reports",
                "logicaldeleted": false,
                "tocnodepid": "urn:node:ID0003052904",
                "emptynode": false,
                "tocnode": [
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "KIIA 1",
                    "nodeheading": "Identity of the active substance",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003052905",
                    "emptynode": false,
                    "tocnode": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 1.1",
                        "nodeheading": "Applicant (name, address, contact, phone and fax numbers)",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052906",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 1.2",
                        "nodeheading": "Manufacturer(s) (name, address, contact, phone and fax numbers)",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052907",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 1.3",
                        "nodeheading": "ISO common name proposed or accepted, and synonyms",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052908",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 1.4",
                        "nodeheading": "Chemical name",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052909",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 1.5",
                        "nodeheading": "Manufacturer's codes, names and patent status",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052910",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 1.5.1",
                            "nodeheading": "Manufacturer's code number(s), incl. countries and periods where...",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052911",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 1.5.2",
                            "nodeheading": "Trade name(s)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052912",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 1.5.3",
                            "nodeheading": "Patent status",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052913",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 1.6",
                        "nodeheading": "Existing CAS, CIPAC, EINECS and ELINCS numbers",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052914",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 1.7",
                        "nodeheading": "Molecular formula, molecular mass and structural formula",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052915",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 1.8",
                        "nodeheading": "Method of manufacture",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052916",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 1.8.1",
                            "nodeheading": "Method of manufacture for each plant",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052917",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 1.8.2",
                            "nodeheading": "Description of starting materials",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052918",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 1.9",
                        "nodeheading": "Specification of purity of the active substance",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052919",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 1.9.1",
                            "nodeheading": "Minimum and/or nominal content (g/kg) of pure active substance",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052920",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_Document_J_01_T-423579_0003052902"
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 1.9.2",
                            "nodeheading": "Certified limits of the active substances",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052921",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 1.9.3",
                            "nodeheading": "Control product specification form/confidential statement of formula",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052922",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 1.10",
                        "nodeheading": "Identity, content and structure of isomers, impurities and additives",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052923",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 1.10.1",
                            "nodeheading": "Inactive isomers",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052924",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 1.10.2",
                            "nodeheading": "Impurities and additives",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052925",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 1.11",
                        "nodeheading": "Batch analysis data",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052926",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 1.11.1",
                            "nodeheading": "Analytical profile of batches",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052927",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 1.11.2",
                            "nodeheading": "Results of analyses of batches used in toxicological testing",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052928",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 1.12",
                        "nodeheading": "Other/special studies",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052929",
                        "emptynode": false
                      }
                    ]
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "KIIA 2",
                    "nodeheading": "Physical and chemical properties of the active substance",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003052930",
                    "emptynode": false,
                    "tocnode": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.1",
                        "nodeheading": "Melting point and boiling point",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052931",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.1.1",
                            "nodeheading": "Melting point, freezing point or solidification point, purified a.s.",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052932",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.1.2",
                            "nodeheading": "Boiling point of purified active substance",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052933",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.1.3",
                            "nodeheading": "Temperature at which decomposition or sublimation occurs",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052934",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.2",
                        "nodeheading": "Relative density of purified active substance",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052935",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.3",
                        "nodeheading": "Vapour pressure and volatility",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052936",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.3.1",
                            "nodeheading": "Vapour pressure of purified active substance",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052937",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.3.2",
                            "nodeheading": "Henry's law constant",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052938",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.4",
                        "nodeheading": "Appearance",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052939",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.4.1",
                            "nodeheading": "Description of the physical state and colour, pur. and techn. a.s.",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052940",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.4.2",
                            "nodeheading": "Description of the odour - purified and technical active substance",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052941",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.5",
                        "nodeheading": "Spectra and molecular extinction at relevant wavelengths",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052942",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.5.1",
                            "nodeheading": "Spectra for purified active substance",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052943",
                            "emptynode": false,
                            "tocnode": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 2.5.1.1",
                                "nodeheading": "UV/VIS",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003052944",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 2.5.1.2",
                                "nodeheading": "IR",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003052945",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 2.5.1.3",
                                "nodeheading": "NMR",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003052946",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 2.5.1.4",
                                "nodeheading": "MS",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003052947",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 2.5.1.5",
                                "nodeheading": "Wavelengths at which UV/VIS molecular extinction occurs, max > 290...",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003052948",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 2.5.1.6",
                                "nodeheading": "Optical purity",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003052949",
                                "emptynode": false
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.5.2",
                            "nodeheading": "Spectra for impurities",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052950",
                            "emptynode": false,
                            "tocnode": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 2.5.2.1",
                                "nodeheading": "UV/VIS",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003052951",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 2.5.2.2",
                                "nodeheading": "IR",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003052952",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 2.5.2.3",
                                "nodeheading": "NMR",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003052953",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 2.5.2.4",
                                "nodeheading": "MS",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003052954",
                                "emptynode": false
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.6",
                        "nodeheading": "Solubility of purified active substance in water (pH 4-10)",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052955",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.7",
                        "nodeheading": "Solubility in organic solvents at 15 to 25 °C",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052956",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.8",
                        "nodeheading": "Partition coefficient",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052957",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.8.1",
                            "nodeheading": "n-Octanol/water partition coefficient",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052958",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.8.2",
                            "nodeheading": "Effect of pH (4 to 10) on the n-octanol/water partition coefficient",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052959",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.9",
                        "nodeheading": "Hydrolysis and photolysis",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052960",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.9.1",
                            "nodeheading": "Hydrolysis rate at pH 4, 7 and 9 under sterile and dark conditions",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052961",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.9.2",
                            "nodeheading": "Direct phototransformation in sterile water using artificial light",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052962",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.9.3",
                            "nodeheading": "Quantum yield of direct phototransformation",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052963",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.9.4",
                            "nodeheading": "Lifetime in the top layer of aqueous systems (calculated and real)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052964",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.9.5",
                            "nodeheading": "Dissociation in water of purified active substance",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052965",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.10",
                        "nodeheading": "Estimated photochemical oxidative degradation",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052966",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.11",
                        "nodeheading": "Flammability including auto-flammability",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052967",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.11.1",
                            "nodeheading": "Flammability of the active substance as manufactured",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052968",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.11.2",
                            "nodeheading": "Auto-flammability of the active substance as manufactured",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052969",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.12",
                        "nodeheading": "Flash point of the active substance as manufactured",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052970",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.13",
                        "nodeheading": "Explosive properties of the active substance as manufactured",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052971",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.14",
                        "nodeheading": "Surface tension of the active substance as manufactured",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052972",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.15",
                        "nodeheading": "Oxidizing properties of the active substance as manufactured",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052973",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.16",
                        "nodeheading": "pH",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052974",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.17",
                        "nodeheading": "Stability",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052975",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.17.1",
                            "nodeheading": "Storage stability",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052976",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 2.17.2",
                            "nodeheading": "Stability (temperature, metals)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052977",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 2.18",
                        "nodeheading": "Other/special studies",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052978",
                        "emptynode": false
                      }
                    ]
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "KIIA 3",
                    "nodeheading": "Further information on the active substance",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003052979",
                    "emptynode": false,
                    "tocnode": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 3.1",
                        "nodeheading": "Function e.g. fungicide",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052980",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 3.2",
                        "nodeheading": "Effects on harmful organisms e.g. contact action",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052981",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 3.2.1",
                            "nodeheading": "Nature of the effects on harmful organisms",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052982",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 3.2.2",
                            "nodeheading": "Translocation in plants",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052983",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 3.3",
                        "nodeheading": "Fields of use e.g. forestry",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052984",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 3.4",
                        "nodeheading": "Harmful organisms controlled and crops / products protected or tre...",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052985",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 3.4.1",
                            "nodeheading": "Details of existing and intended uses",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052986",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 3.4.2",
                            "nodeheading": "Details of harmful organisms against which protection is afforded",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052987",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 3.4.3",
                            "nodeheading": "Effects achieved e.g. sprout suppression",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052988",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 3.5",
                        "nodeheading": "Mode of action",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052989",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 3.5.1",
                            "nodeheading": "Mode of action, mechanism(s) and pathway(s) involved",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052990",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 3.5.2",
                            "nodeheading": "Details of active metabolites and degradation products",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052991",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 3.5.3",
                            "nodeheading": "Formation of active metabolites and degradation products",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052992",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 3.6",
                        "nodeheading": "Possible development of resistance or cross-resistance",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052993",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 3.7",
                        "nodeheading": "A material safety data sheet for the active substance",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052994",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 3.8",
                        "nodeheading": "Procedures for destruction and decontamination",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052995",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 3.8.1",
                            "nodeheading": "Pyrolytic behaviour under controlled conditions at 800 °C",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052996",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 3.8.2",
                            "nodeheading": "Detailed instructions for safe disposal",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052997",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 3.8.3",
                            "nodeheading": "Methods other than controlled incineration for disposal",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003052998",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 3.9",
                        "nodeheading": "Procedures for decontamination of water in case of an accident",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003052999",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 3.10",
                        "nodeheading": "Other/special studies",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053000",
                        "emptynode": false
                      }
                    ]
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "KIIA 4",
                    "nodeheading": "Analytical Methods and Validation",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053001",
                    "emptynode": false,
                    "tocnode": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 4.1",
                        "nodeheading": "Analytical standards and samples",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053002",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 4.1.1",
                            "nodeheading": "Analytical standards for pure active substance",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053003",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 4.1.2",
                            "nodeheading": "Samples of the active substance as manufactured",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053004",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 4.1.3",
                            "nodeheading": "Analytical standards for relevant metabolites and other components",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053005",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 4.1.4",
                            "nodeheading": "Samples of reference substances for relevant impurities",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053006",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_4.1_01_T-423640_0003053002"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 4.2",
                        "nodeheading": "Methods for the analysis of the active substance as manufactured",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053007",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 4.2.1",
                            "nodeheading": "Methods for the analysis of the active substance as manufactured",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053008",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 4.2.2",
                            "nodeheading": "Applicability of existing CIPAC methods",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053009",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 4.2.3",
                            "nodeheading": "Description of analytical methods for the determination of impurit...",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053010",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 4.2.4",
                            "nodeheading": "Description of analytical methods for the determination of additives",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053011",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 4.2.5",
                            "nodeheading": "Enforcement analytical methodology",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053012",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 4.2.6",
                            "nodeheading": "Inter-Laboratory analytical methodology validation",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053013",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 4.2.7",
                            "nodeheading": "Storage stability of working solutions in analytical methodology",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053014",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 4.3",
                        "nodeheading": "Description of analytical methods for the determination of residues",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053015",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 4.4",
                        "nodeheading": "Description of methods for analysis of soil (parent and metabolites)",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053016",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 4.5",
                        "nodeheading": "Description of methods of analysis of water (parent and metabolites)",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053017",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 4.6",
                        "nodeheading": "Method for determining pesticides in sediment",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053018",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 4.7",
                        "nodeheading": "Methods for analysis of air (parent and metabolites)",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053019",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 4.8",
                        "nodeheading": "Methods for analysis of body fluid/tissues (parent and metabolites)",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053020",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 4.9",
                        "nodeheading": "Other/special studies",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053021",
                        "emptynode": false
                      }
                    ]
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "KIIA 5",
                    "nodeheading": "Toxicological and Toxicokinetic Studies on the Active Substance",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053022",
                    "emptynode": false,
                    "tocnode": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 5.1",
                        "nodeheading": "Absorption, distribution, excretion and metabolism in mammals",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053023",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.1.1",
                            "nodeheading": "Toxicokinetic studies - Single dose, oral route, in rats",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053024",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.1.2",
                            "nodeheading": "Toxicokinetic studies - Second single dose, oral route, in rats",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053025",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.1.3",
                            "nodeheading": "Toxicokinetic studies - Repeated dose, oral route, in rats",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053026",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 5.2",
                        "nodeheading": "Acute toxicity",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053027",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.2.1",
                            "nodeheading": "Acute oral toxicity",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053028",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_5.2.1_01_T-423586_0003053028"
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_5.2.1_02_T-423584_0003053028"
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.2.2",
                            "nodeheading": "Acute percutaneous toxicity",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053029",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.2.3",
                            "nodeheading": "Acute inhalation toxicity",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053030",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_5.2.3_01_T-423615_0003053030"
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.2.4",
                            "nodeheading": "Skin irritation",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053031",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_5.2.4_01_T-423612_0003053031"
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.2.5",
                            "nodeheading": "Eye Irritation",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053032",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.2.6",
                            "nodeheading": "Skin sensitization",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053033",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.2.7",
                            "nodeheading": "Potentiation/interactions of multiple active substances or products",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053034",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 5.3",
                        "nodeheading": "Short-term toxicity",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053035",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.3.1",
                            "nodeheading": "Oral 28-day toxicity",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053036",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.3.2",
                            "nodeheading": "Oral 90-day toxicity (rodents)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053037",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.3.3",
                            "nodeheading": "Oral 90-day toxicity (dog)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053038",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.3.4",
                            "nodeheading": "Oral 1 year toxicity (dog)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053039",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.3.5",
                            "nodeheading": "28-day inhalation toxicity (rodents)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053040",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_5.2.3_01_T-423615_0003053030"
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.3.6",
                            "nodeheading": "90-day inhalation toxicity (rodents)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053041",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_5.2.3_01_T-423615_0003053030"
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.3.7",
                            "nodeheading": "Percutaneous 28-day toxicity (rodents)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053042",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_5.3.7_01_T-423618_0003053042"
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.3.8",
                            "nodeheading": "Percutaneous 90-day toxicity (rodents)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053043",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_5.3.7_01_T-423618_0003053042"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 5.4",
                        "nodeheading": "Genotoxicity",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053044",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.4.1",
                            "nodeheading": "In vitro genotoxicity - Bacterial assay for gene mutation",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053045",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.4.2",
                            "nodeheading": "In vitro genotoxicity - Test for clastogenicity in mammalian cells",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053046",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.4.3",
                            "nodeheading": "In vitro genotoxicity - Test for gene mutation in mammalian cells",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053047",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.4.4",
                            "nodeheading": "In vivo genotoxicity (somatic cells) - Bone marrow or micronucleus",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053048",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.4.5",
                            "nodeheading": "In vivo genotoxicity (somatic cells) - DNA repair or mouse spot tests",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053049",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.4.6",
                            "nodeheading": "In vivo studies in germ cells",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053050",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 5.5",
                        "nodeheading": "Long-term toxicity and carcinogenicity",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053051",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.5.1",
                            "nodeheading": "Long-term (2 years) oral toxicity in the rat",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053052",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.5.2",
                            "nodeheading": "Carcinogenicity study in the rat",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053053",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.5.3",
                            "nodeheading": "Carcinogenicity study in the mouse",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053054",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.5.4",
                            "nodeheading": "Mechanism of action and supporting data",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053055",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 5.6",
                        "nodeheading": "Reproductive toxicity",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053056",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.6.1",
                            "nodeheading": "Two generation reproductive toxicity in the rat",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053057",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.6.2",
                            "nodeheading": "Separate male and female studies",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053058",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.6.3",
                            "nodeheading": "Three segment designs",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053059",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.6.4",
                            "nodeheading": "Dominant lethal assay for the male fertility",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053060",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.6.5",
                            "nodeheading": "Cross-matings of treated males with untreated females and vice versa",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053061",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.6.6",
                            "nodeheading": "Effects on spermatogenesis",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053062",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.6.7",
                            "nodeheading": "Effects on oogenesis",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053063",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.6.8",
                            "nodeheading": "Sperm motility, mobility and morphology",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053064",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.6.9",
                            "nodeheading": "Investigation of hormonal activity",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053065",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.6.10",
                            "nodeheading": "Teratogenicity test by the oral route in the rat",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053066",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_5.6.10_01_T-423604_0003053066"
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.6.11",
                            "nodeheading": "Teratogenicity test by the oral route in the rabbit",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053067",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 5.7",
                        "nodeheading": "Neurotoxicity",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053068",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.7.1",
                            "nodeheading": "Acute neurotoxicity - rat",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053069",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.7.2",
                            "nodeheading": "Delayed neurotoxicity following acute exposure",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053070",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.7.3",
                            "nodeheading": "28-day delayed neurotoxicity",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053071",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.7.4",
                            "nodeheading": "Subchronic neurotoxicity - rat - 90-day",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053072",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.7.5",
                            "nodeheading": "Postnatal developmental neurotoxicity",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053073",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 5.8",
                        "nodeheading": "Toxicity studies on metabolites",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053074",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 5.9",
                        "nodeheading": "Medical and clinical data",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053075",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.9.1",
                            "nodeheading": "Report on medical surveillance on manufacturing plant personnel",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053076",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.9.2",
                            "nodeheading": "Report on clinical cases and poisoning incidents",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053077",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.9.3",
                            "nodeheading": "Observations on general population exposure & epidemiological stud...",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053078",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.9.4",
                            "nodeheading": "Clinical signs and symptoms of poisoning and details of clinical t...",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053079",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.9.5",
                            "nodeheading": "First aid measures",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053080",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.9.6",
                            "nodeheading": "Therapeutic regimes",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053081",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.9.7",
                            "nodeheading": "Expected effects & duration of poisoning as a function of exposure",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053082",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.9.8",
                            "nodeheading": "Effects & duration of poisoning as a function of time",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053083",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 5.9.9",
                            "nodeheading": "Dermal penetration",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053084",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 5.10",
                        "nodeheading": "Other/special studies",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053085",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 5.11",
                        "nodeheading": "Summary of mammalian toxicity and overall evaluation",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053086",
                        "emptynode": false
                      }
                    ]
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "KIIA 6",
                    "nodeheading": "Metabolism and Residues Data",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053087",
                    "emptynode": false,
                    "tocnode": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 6.1",
                        "nodeheading": "Stability of residues",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053088",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.1.1",
                            "nodeheading": "Stability of residues during storage of samples",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053089",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.1.2",
                            "nodeheading": "Stability of residues in samples extracts",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053090",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 6.2",
                        "nodeheading": "Metabolism, distribution and expression of residues",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053091",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.2.1",
                            "nodeheading": "In plants, at least three crops from three different crop categories",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053092",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.2.2",
                            "nodeheading": "Poultry",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053093",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.2.3",
                            "nodeheading": "Lactating ruminants (goat or cow)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053094",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.2.4",
                            "nodeheading": "Pigs",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053095",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.2.5",
                            "nodeheading": "Nature of residue in fish",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053096",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.2.6",
                            "nodeheading": "Chemical identity",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053097",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 6.3",
                        "nodeheading": "Residue trials (supervised field trials)",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053098",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.3.1",
                            "nodeheading": "Crop 1 (e.g. wheat)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053099",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.3.2",
                            "nodeheading": "Crop 2 (e.g. oilseed rape)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053100",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.3.3",
                            "nodeheading": "Crop 3",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053101",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.3.4",
                            "nodeheading": "Crop 4, etc.",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053102",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 6.4",
                        "nodeheading": "Livestock feeding studies",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053103",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.4.1",
                            "nodeheading": "Poultry",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053104",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.4.2",
                            "nodeheading": "Lactating ruminants (goat or cow)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053105",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.4.3",
                            "nodeheading": "Pigs",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053106",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.4.4",
                            "nodeheading": "Fish",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053107",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 6.5",
                        "nodeheading": "Effects of industrial processing and/or household preparation on",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053108",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.5.1",
                            "nodeheading": "The nature of residue",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053109",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.5.2",
                            "nodeheading": "Distribution of the residue in peel/pulp",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053110",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.5.3",
                            "nodeheading": "Residue levels - balance studies on set of representative processes",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053111",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.5.4",
                            "nodeheading": "Residue levels - follow-up studies: concentration or dilution fact...",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053112",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 6.6",
                        "nodeheading": "Residues in succeeding crops",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053113",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.6.1",
                            "nodeheading": "Theoretical consideration of the nature and level of the residue",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053114",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.6.2",
                            "nodeheading": "Metabolism and distribution studies on representative crops",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053115",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.6.3",
                            "nodeheading": "Field trials on representative crops",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053116",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 6.7",
                        "nodeheading": "Proposed residue definition and maximum residue levels",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053117",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.7.1",
                            "nodeheading": "Proposed residue definition",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053118",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.7.2",
                            "nodeheading": "Proposed maximum residue levels (MRLs) and justification",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053119",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 6.8",
                        "nodeheading": "Proposed pre-harvest intervals, re-entry or withholding periods",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053120",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.8.1",
                            "nodeheading": "Pre-harvest interval (in days) for each relevant crop",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053121",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.8.2",
                            "nodeheading": "Re-entry period (in days) for livestock, to areas to be grazed",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053122",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.8.3",
                            "nodeheading": "Re-entry period for man to crops, buildings or spaces treated",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053123",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.8.4",
                            "nodeheading": "Withholding period (in days) for animals feedingstuffs",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053124",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.8.5",
                            "nodeheading": "Waiting period between last application and sowing or planting",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053125",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.8.6",
                            "nodeheading": "Waiting period between application and handling treated products",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053126",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.8.7",
                            "nodeheading": "Waiting period before sowing/planting succeeding crops",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053127",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 6.9",
                        "nodeheading": "Estimation of exposure through diet and other means",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053128",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.9.1",
                            "nodeheading": "TMDI calculations",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053129",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.9.2",
                            "nodeheading": "NEDI calculations",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053130",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.9.3",
                            "nodeheading": "NESTI calculations",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053131",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 6.10",
                        "nodeheading": "Other/special studies",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053132",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 6.11",
                        "nodeheading": "Summary and evaluation of residue behaviour and reasonable grounds",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053133",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.11.1",
                            "nodeheading": "Summary and evaluation of residue behaviour",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053134",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 6.11.2",
                            "nodeheading": "Reasonable grounds in support of the petition",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053135",
                            "emptynode": false
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "KIIA 7",
                    "nodeheading": "Fate and behaviour in the environment",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053136",
                    "emptynode": false,
                    "tocnode": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 7.1",
                        "nodeheading": "Route of degradation in soil - laboratory studies",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053137",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.1.1",
                            "nodeheading": "Aerobic degradation",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053138",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_7.1.1_01_T-423613_0003053138"
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.1.2",
                            "nodeheading": "Anaerobic degradation",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053139",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_7.1.1_01_T-423613_0003053138"
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.1.3",
                            "nodeheading": "Soil photolysis",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053140",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 7.2",
                        "nodeheading": "Rate of degradation in soil(s) - laboratory studies",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053141",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.2.1",
                            "nodeheading": "Aerobic degradation of the active substance in soils at 20 °C",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053142",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.2.2",
                            "nodeheading": "Aerobic degradation of the active substance in soils at 10 °C",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053143",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.2.3",
                            "nodeheading": "Aerobic degradation of relevant metabolites in soils at 20 °C",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053144",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.2.4",
                            "nodeheading": "Anaerobic degradation of the active substance in soil",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053145",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.2.5",
                            "nodeheading": "Anaerobic degradation of relevant metabolites in soil",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053146",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 7.3",
                        "nodeheading": "Field studies",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053147",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.3.1",
                            "nodeheading": "Soil dissipation testing in a range of representative soils",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053148",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.3.2",
                            "nodeheading": "Soil residue testing",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053149",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.3.3",
                            "nodeheading": "Soil accumulation testing on relevant soils",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053150",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 7.4",
                        "nodeheading": "Mobility studies",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053151",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.4.1",
                            "nodeheading": "Adsorption and desorption of the active substance",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053152",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.4.2",
                            "nodeheading": "Adsorption & desorption of rel. metabolites, degr. & react. products",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053153",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.4.3",
                            "nodeheading": "Column leaching studies with the active substance",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053154",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.4.4",
                            "nodeheading": "Column leaching studies rel. metabolites, degr. & react. products",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053155",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.4.5",
                            "nodeheading": "Aged residue column leaching",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053156",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.4.6",
                            "nodeheading": "Leaching (TLC)",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053157",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.4.7",
                            "nodeheading": "Lysimeter studies",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053158",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.4.8",
                            "nodeheading": "Field leaching studies",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053159",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.4.9",
                            "nodeheading": "Volability - laboratory study",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053160",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 7.5",
                        "nodeheading": "Hydrolysis rate of relevant metabolites at pH values 4, 7 and 9",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053161",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 7.6",
                        "nodeheading": "Direct phototransformation of relevant metabolites in water",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053162",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 7.7",
                        "nodeheading": "Ready biodegradability of the active substance",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053163",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 7.8",
                        "nodeheading": "Degradation in aquatic systems",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053164",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.8.1",
                            "nodeheading": "Aerobic biodegradation in aquatic systems",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053165",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.8.2",
                            "nodeheading": "Anaerobic biodegradation in aquatic systems",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053166",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 7.8.3",
                            "nodeheading": "Water/sediment studies",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053167",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 7.9",
                        "nodeheading": "Degradation in the saturated zone",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053168",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 7.10",
                        "nodeheading": "Rate and route of degradation in air",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053169",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 7.11",
                        "nodeheading": "Definition of the residue",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053170",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 7.12",
                        "nodeheading": "Monitoring data concerning fate and behaviour",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053171",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 7.13",
                        "nodeheading": "Other/special studies",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053172",
                        "emptynode": false
                      }
                    ]
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "KIIA 8",
                    "nodeheading": "Ecotoxicological studies on the active substance",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053173",
                    "emptynode": false,
                    "tocnode": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.1",
                        "nodeheading": "Avian toxicity",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053174",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.1.1",
                            "nodeheading": "Acute oral toxicity to quail species, mallard duck or other bird",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053175",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_8.1.1_01_T-423605_0003053175"
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_8.1.1_02_T-423616_0003053175"
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.1.2",
                            "nodeheading": "Avian dietary toxicity (5-day) test in quail species or mallard duck",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053176",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_8.1.1_01_T-423605_0003053175"
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_8.1.2_02_T-423616_0003053176"
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.1.3",
                            "nodeheading": "Avian dietary toxicity (5-day) test in a second unrelated species",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053177",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.1.4",
                            "nodeheading": "Subchronic and reproductive toxicity to birds",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053178",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.2",
                        "nodeheading": "Fish toxicity",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053179",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.2.1",
                            "nodeheading": "Acute toxicity of the active substance to fish",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053180",
                            "emptynode": false,
                            "tocnode": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.2.1.1",
                                "nodeheading": "Rainbow trout (oncorhynchus mykiss)",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053181",
                                "emptynode": false,
                                "toc2DOC": [
                                  {
                                    "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                    "toDocumentId": "D_KIIA_8.2.1.1_01_T-423601_0003053181"
                                  }
                                ]
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.2.1.2",
                                "nodeheading": "Warm water fish species",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053182",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.2.1.3",
                                "nodeheading": "Acute toxicity of metabolites to the more sensitive of fish species",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053183",
                                "emptynode": false
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.2.2",
                            "nodeheading": "Chronic toxicity to fish",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053184",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.2.3",
                            "nodeheading": "Chronic toxicity (28 day exposure) to juvenile fish",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053185",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.2.4",
                            "nodeheading": "Fish early life stage toxicity test",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053186",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.2.5",
                            "nodeheading": "Fish life cycle test",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053187",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.2.6",
                            "nodeheading": "Bioconcentration potential in fish",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053188",
                            "emptynode": false,
                            "tocnode": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.2.6.1",
                                "nodeheading": "Bioconcentration potential of the active substance in fish",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053189",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.2.6.2",
                                "nodeheading": "Bioconcentration potential of the metabolites, degr. & react. prod...",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053190",
                                "emptynode": false
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.2.7",
                            "nodeheading": "Aquatic bioavailability/ biomagnification / depuration",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053191",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.3",
                        "nodeheading": "Toxicity to aquatic species other than fish, aquatic field tests",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053192",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.3.1",
                            "nodeheading": "Acute toxicity to aquatic invertebrates",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053193",
                            "emptynode": false,
                            "tocnode": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.3.1.1",
                                "nodeheading": "Acute toxicity (24 and 48 hour) for Daphnia preferably (Daphnia ma...",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053194",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.3.1.2",
                                "nodeheading": "Acute toxicity (24/48 h) for representative species of aquatic ins...",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053195",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.3.1.3",
                                "nodeheading": "Acute toxicity for representative species of aquatic crustaceans",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053196",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.3.1.4",
                                "nodeheading": "Acute toxicity for repr. species of aquatic gastropod molluscs",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053197",
                                "emptynode": false
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.3.2",
                            "nodeheading": "Chronic toxicity to aquatic invertebrates",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053198",
                            "emptynode": false,
                            "tocnode": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.3.2.1",
                                "nodeheading": "Chronic toxicity in Daphnia magna (21-day)",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053199",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.3.2.2",
                                "nodeheading": "Chronic toxicity for representative species of aquatic insects",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053200",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.3.2.3",
                                "nodeheading": "Chronic toxicity for repr. species of aquatic gastropod molluscs",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053201",
                                "emptynode": false
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.3.3",
                            "nodeheading": "Aquatic field testing",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053202",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.4",
                        "nodeheading": "Effects on algal growth and growth rate (2 species)",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053203",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.5",
                        "nodeheading": "Effects on sediment dwelling organisms",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053204",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.5.1",
                            "nodeheading": "Acute test",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053205",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.5.2",
                            "nodeheading": "Chronic test",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053206",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.6",
                        "nodeheading": "Effects on aquatic plants",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053207",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.7",
                        "nodeheading": "Effects on bees",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053208",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.7.1",
                            "nodeheading": "Acute oral toxicity",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053209",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.7.2",
                            "nodeheading": "Acute contact toxicity",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053210",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.7.3",
                            "nodeheading": "Toxicity of residues on foliage to honey bees",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053211",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.7.4",
                            "nodeheading": "Bee brood feeding test",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053212",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.8",
                        "nodeheading": "Effects on non-target terrestrial arthropods",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053213",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.8.1",
                            "nodeheading": "Effects on non-target terrestrial arthropods, artificial substrates",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053214",
                            "emptynode": false,
                            "tocnode": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.8.1.1",
                                "nodeheading": "Parasitoid",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053215",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.8.1.2",
                                "nodeheading": "Predatory mites",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053216",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.8.1.3",
                                "nodeheading": "Ground dwelling predatory species",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053217",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.8.1.4",
                                "nodeheading": "Foliage dwelling predatory species",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053218",
                                "emptynode": false
                              }
                            ]
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.8.2",
                            "nodeheading": "Effects on non-target terrestrial arthropods in lab/semi-field test",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053219",
                            "emptynode": false,
                            "tocnode": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.8.2.1",
                                "nodeheading": "Parasitoid",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053220",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.8.2.2",
                                "nodeheading": "Predatory mites",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053221",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.8.2.3",
                                "nodeheading": "Ground dwelling predatory species",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053222",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.8.2.4",
                                "nodeheading": "Foliage dwelling predatory species",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053223",
                                "emptynode": false
                              },
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                                "nodename": "KIIA 8.8.2.5",
                                "nodeheading": "Other terrestrial invertebrates",
                                "logicaldeleted": false,
                                "tocnodepid": "urn:node:ID0003053224",
                                "emptynode": false
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.9",
                        "nodeheading": "Effects on earthworms",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053225",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.9.1",
                            "nodeheading": "Acute toxicity to earthworms",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053226",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.9.2",
                            "nodeheading": "Sublethal effects on earthworms",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053227",
                            "emptynode": false,
                            "toc2DOC": [
                              {
                                "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                                "toDocumentId": "D_KIIA_8.9.2_01_T-423656_0003053227"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.10",
                        "nodeheading": "Effects on soil microbial activity",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053228",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.10.1",
                            "nodeheading": "Nitrogen transformation",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053229",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.10.2",
                            "nodeheading": "Carbon mineralization",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053230",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.10.3",
                            "nodeheading": "Rates of recovery following treatment",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053231",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.11",
                        "nodeheading": "Effects on marine and estuarine organisms",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053232",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.11.1",
                            "nodeheading": "Marine or estuarine organisms acute toxicity LC50/EC50",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053233",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.11.2",
                            "nodeheading": "Marine/Estuarine fish - salinity challenge",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053234",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.12",
                        "nodeheading": "Effects on terrestrial vascular plants",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053235",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.13",
                        "nodeheading": "Effects on terr. vertebrates other than birds / wild mammal toxicity",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053236",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.14",
                        "nodeheading": "Effects on other non-target organisms believed to be at risk",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053237",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.14.1",
                            "nodeheading": "Summary of preliminary data: biological activity & dose range find...",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053238",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.14.2",
                            "nodeheading": "Assessment of relevance to potential impact on non-target species",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053239",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.15",
                        "nodeheading": "Effects on biological methods for sewage treatment",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053240",
                        "emptynode": false
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.16",
                        "nodeheading": "Other/special studies",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053241",
                        "emptynode": false,
                        "tocnode": [
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.16.1",
                            "nodeheading": "Other/special studies - laboratory studies",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053242",
                            "emptynode": false
                          },
                          {
                            "TYPE_NAME": "GHSTS.TYPETOCNODE",
                            "nodename": "KIIA 8.16.2",
                            "nodeheading": "Other/special studies - field studies",
                            "logicaldeleted": false,
                            "tocnodepid": "urn:node:ID0003053243",
                            "emptynode": false
                          }
                        ]
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE",
                        "nodename": "KIIA 8.17",
                        "nodeheading": "Summary and evaluation of points IIA 7 and IIA 8.1 to 8.16",
                        "logicaldeleted": false,
                        "tocnodepid": "urn:node:ID0003053244",
                        "emptynode": false
                      }
                    ]
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "KIIA 9",
                    "nodeheading": "Proposals for classification and labelling of the a.s.",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053245",
                    "emptynode": false
                  }
                ]
              },
              {
                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                "nodename": "Document LIIA",
                "nodeheading": "Quality check of reports (Tier I) and reference lists",
                "logicaldeleted": false,
                "tocnodepid": "urn:node:ID0003053246",
                "emptynode": false,
                "tocnode": [
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "LIIA Sec 1",
                    "nodeheading": "Identity, physical and chemical properties and further information",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053247",
                    "emptynode": false
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "LIIA Sec 2",
                    "nodeheading": "Analytical methods",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053248",
                    "emptynode": false
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "LIIA Sec 3",
                    "nodeheading": "Toxicological and metabolism studies on the active substance",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053249",
                    "emptynode": false
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "LIIA Sec 4",
                    "nodeheading": "Residues and plant metabolism",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053250",
                    "emptynode": false
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "LIIA Sec 5",
                    "nodeheading": "Fate and behaviour in the environment",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053251",
                    "emptynode": false
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "LIIA Sec 6",
                    "nodeheading": "Ecotoxicological studies on the active substance",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053252",
                    "emptynode": false,
                    "toc2DOC": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                        "toDocumentId": "D_Document_LIIA_01_M-508647_0003053246"
                      }
                    ]
                  }
                ]
              },
              {
                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                "nodename": "Document MIIA",
                "nodeheading": "Summary and evaluation (Tier II)",
                "logicaldeleted": false,
                "tocnodepid": "urn:node:ID0003053253",
                "emptynode": false,
                "tocnode": [
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "MIIA Sec 1",
                    "nodeheading": "Identity, physical and chemical properties and further information",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053254",
                    "emptynode": false,
                    "toc2DOC": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                        "toDocumentId": "D_MIIA_Sec_1_01_T-423658_0003053254"
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                        "toDocumentId": "D_MIIA_Sec_1_02_T-423596_0003053254"
                      }
                    ]
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "MIIA Sec 2",
                    "nodeheading": "Analytical methods",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053255",
                    "emptynode": false,
                    "toc2DOC": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                        "toDocumentId": "D_MIIA_Sec_2_01_T-423659_0003053255"
                      }
                    ]
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "MIIA Sec 3",
                    "nodeheading": "Toxicological and metabolism studies on the active substance",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053256",
                    "emptynode": false,
                    "toc2DOC": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                        "toDocumentId": "D_MIIA_Sec_3_01_T-423662_0003053256"
                      },
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                        "toDocumentId": "D_MIIA_Sec_3_02_T-423592_0003053256"
                      }
                    ]
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "MIIA Sec 4",
                    "nodeheading": "Residues and plant metabolism",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053257",
                    "emptynode": false,
                    "toc2DOC": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                        "toDocumentId": "D_MIIA_Sec_4_01_T-423663_0003053257"
                      }
                    ]
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "MIIA Sec 5",
                    "nodeheading": "Fate and behaviour in the environment",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053258",
                    "emptynode": false,
                    "toc2DOC": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                        "toDocumentId": "D_MIIA_Sec_5_01_T-423664_0003053258"
                      }
                    ]
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE",
                    "nodename": "MIIA Sec 6",
                    "nodeheading": "Ecotoxicological studies on the active substance",
                    "logicaldeleted": false,
                    "tocnodepid": "urn:node:ID0003053259",
                    "emptynode": false,
                    "toc2DOC": [
                      {
                        "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                        "toDocumentId": "D_MIIA_Sec_6_01_T-423591_0003053259"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "TYPE_NAME": "GHSTS.TYPETOCNODE",
            "nodename": "Document N",
            "nodeheading": "Overall conclusions (Tier III)",
            "logicaldeleted": false,
            "tocnodepid": "urn:node:ID0003053260",
            "emptynode": false
          },
          {
            "TYPE_NAME": "GHSTS.TYPETOCNODE",
            "nodename": "Document O",
            "nodeheading": "Initial evaluation forms",
            "logicaldeleted": false,
            "tocnodepid": "urn:node:ID0003053261",
            "emptynode": false,
            "tocnode": [
              {
                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                "nodename": "OA-J",
                "nodeheading": "Documents A-J",
                "logicaldeleted": false,
                "tocnodepid": "urn:node:ID0003053262",
                "emptynode": false
              },
              {
                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                "nodename": "OL-M",
                "nodeheading": "Documents L-M",
                "logicaldeleted": false,
                "tocnodepid": "urn:node:ID0003053263",
                "emptynode": false,
                "toc2DOC": [
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                    "toDocumentId": "D_OL-M_01_T-423583_0003053263"
                  }
                ]
              },
              {
                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                "nodename": "OIIA",
                "nodeheading": "Active substance",
                "logicaldeleted": false,
                "tocnodepid": "urn:node:ID0003053264",
                "emptynode": false,
                "toc2DOC": [
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                    "toDocumentId": "D_OIIA_01_T-423585_0003053264"
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                    "toDocumentId": "D_OIIA_02_T-423581_0003053264"
                  },
                  {
                    "TYPE_NAME": "GHSTS.TYPETOCNODE.TOC2DOC",
                    "toDocumentId": "D_OIIA_03_T-423578_0003053264"
                  }
                ]
              },
              {
                "TYPE_NAME": "GHSTS.TYPETOCNODE",
                "nodename": "OIIIA",
                "nodeheading": "Plant protection product(s)",
                "logicaldeleted": false,
                "tocnodepid": "urn:node:ID0003053265",
                "emptynode": false
              }
            ]
          }
        ]
      };
    }
  }
})
.name;
