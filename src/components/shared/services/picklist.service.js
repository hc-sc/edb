import angular from 'angular';
var fs = require('fs');
var path = require('path');
import xml2js from 'xml2js';
const Nedb = require('nedb');
//import Nedb from 'nedb'; 
import { PicklistModel } from '../shared.model';

const dbPath = path.resolve(fs.realpathSync('./'), 'data');
const version = path.resolve(dbPath, 'ghsts-picklists.xsd');
const filename = path.resolve(dbPath, 'pickListTypes.db');

/*const moduleName = 'app.picklistService';

angular.module(moduleName, [])
 .factory('picklistService', [ function() {
         this.picklistrequest = function(request) {
            if (window.ipcRenderer) {
                return JSON.parse(window.ipcRenderer.sendSync('datarequest', request));
            } else {
                console.log('IPC renderer does not find');
            }
            var lastVar = request.url.slice(request.url.lastIndexOf("/") + 1);
            if (isNaN(lastVar)) {
                return fakeData[request.url.slice(1)];
            } else {
                var otherPart = request.url.slice(1, request.url.lastIndexOf("/"));
                return fakeData[otherPart][lastVar - 1];
            }
        };
        
        return {
            ipcdatarequest : self.ipcdatarequest
        };
    }]);
*/
export default class PickListService {
  constructor() {
    console.log('picklist ctor - ' + filename + ' //// ' + version + ' // ' + dbPath);
    this.pickListTypes = new Nedb({
      filename: filename,
      autoload: true
    });

    // make sure we aren't duplicating entries when we reload...
    this.pickListTypes.find({}, (err, results) => {
      if (results.length === 0) {
        console.log('Loading pick lists from XSD');

        fs.readFile(version, { encoding: 'utf8' }, (err, data) => {
          if (err) throw err;

          xml2js.parseString(data, { attrkey: 'attr$', explicitArray: false }, (err, obj) => {
            if (err) throw err;

            let types = [];

            const COMPLEX_TYPES = obj['xs:schema']['xs:complexType'].map(type => {
              return type['xs:simpleContent']['xs:extension'].attr$.base;
            });

            for (const item of obj['xs:schema']['xs:simpleType']) {
              const INDEX = COMPLEX_TYPES.indexOf(item.attr$.name);
              const OTHER_VALUE = this.getOtherValue();

              for (const enumeration of item['xs:restriction']['xs:enumeration']) {
                const APP_INFO = enumeration['xs:annotation']['xs:appinfo'];
                if (enumeration.attr$.value !== OTHER_VALUE) {

                  let type = {};

                  type.name = INDEX >= 0 ?
                    `EXTENSION_${item.attr$.name}` : item.attr$.name;
                  type.VALUE = enumeration.attr$.value;
                  type.VALUE_DECODE = APP_INFO.DECODE;
                  type.STATUS = APP_INFO.STATUS;
                  type.isExt = false;

                  types.push(new PicklistModel(type));
                }
              }
            }

            this.pickListTypes.insert(types, (err, added) => {
              if (err) throw err;
              console.log(`${added.length} added.`);
            });
          });
        });
      }
    });
  }

  // used to get all types with a given name. Can additionally provide a true/false status, which only returns enabled types
  getType(typeName, isEnabled) {
    return new Promise((resolve, reject) => {
      let query = { name: typeName };

      if (isEnabled === true) {
        query.status = 'enabled';
      }

      this.pickListTypes.find(query)
        .sort({ VALUE: 1 })
        .exec((err, results) => {
          if (err) reject(err);

          let types = [];
          if (typeName.indexOf('EXTENSION') >= 0) {
            types = results.map(item => {
              return new ExtValueStruct(
                item.VALUE,
                item.VALUE_DECODE
              );
            });
          }
          else {
            types = results.map(item => {
              return new ValueStruct(
                item.VALUE,
                item.VALUE_DECODE
              );
            });
          }

          resolve(types);
        });
    });
  }

  $get() {
    return this;
  }

  getMetadataStatusOptions() {
    return [
      { VALUE_DECODE: "New", VALUE: "New" },
      { VALUE_DECODE: "No Change", VALUE: "No Change" },
      { VALUE_DECODE: "Modified", VALUE: "Modified" }
    ];
  }


  getLegalEntityIdentifierTypeOptions() {
    return [
      { VALUE_DECODE: "DUNS-number", VALUE: "DUNS-number" },
      { VALUE_DECODE: "REACH", VALUE: "REACH" },
      { VALUE_DECODE: "SAP", VALUE: "SAP" },
      { VALUE_DECODE: "VAT-number", VALUE: "VAT-number" },
      { VALUE_DECODE: "other", VALUE: "other" }
    ];
  }

  getLegalEntityTypeOptions() {
    return [
      { VALUE_DECODE: "Company", VALUE: "Company" },
      { VALUE_DECODE: "Consultant", VALUE: "Consultant" },
      { VALUE_DECODE: "other", VALUE: "other" },
      { VALUE_DECODE: "Regulatory Authority", VALUE: "Regulatory Authority" },
      { VALUE_DECODE: "Test House", VALUE: "Test House" },
      { VALUE_DECODE: "Third Party", VALUE: "Third Party" },
      { VALUE_DECODE: "University", VALUE: "University" }
    ];
  }


  getCountryOptions() {
    return [
      { VALUE_DECODE: "Andorra", VALUE: "AD" },
      { VALUE_DECODE: "United Arab Emirates", VALUE: "AE" },
      { VALUE_DECODE: "Afghanistan", VALUE: "AF" },
      { VALUE_DECODE: "Antigua and Barbuda", VALUE: "AG" },
      { VALUE_DECODE: "Anguilla", VALUE: "AI" },
      { VALUE_DECODE: "Albania", VALUE: "AL" },
      { VALUE_DECODE: "Armenia", VALUE: "AM" },
      { VALUE_DECODE: "Angola", VALUE: "AO" },
      { VALUE_DECODE: "Antarctica", VALUE: "AQ" },
      { VALUE_DECODE: "Argentina", VALUE: "AR" },
      { VALUE_DECODE: "American Samoa", VALUE: "AS" },
      { VALUE_DECODE: "Austria", VALUE: "AT" },
      { VALUE_DECODE: "Australia", VALUE: "AU" },
      { VALUE_DECODE: "Aruba", VALUE: "AW" },
      { VALUE_DECODE: "Åland", VALUE: "AX" },
      { VALUE_DECODE: "Azerbaijan", VALUE: "AZ" },
      { VALUE_DECODE: "Bosnia and Herzegovina", VALUE: "BA" },
      { VALUE_DECODE: "Barbados", VALUE: "BB" },
      { VALUE_DECODE: "Bangladesh", VALUE: "BD" },
      { VALUE_DECODE: "Belgium", VALUE: "BE" },
      { VALUE_DECODE: "Burkina Faso", VALUE: "BF" },
      { VALUE_DECODE: "Bulgaria", VALUE: "BG" },
      { VALUE_DECODE: "Bahrain", VALUE: "BH" },
      { VALUE_DECODE: "Burundi", VALUE: "BI" },
      { VALUE_DECODE: "Benin", VALUE: "BJ" },
      { VALUE_DECODE: "Saint Barthélemy", VALUE: "BL" },
      { VALUE_DECODE: "Bermuda", VALUE: "BM" },
      { VALUE_DECODE: "Brunei Darussalam", VALUE: "BN" },
      { VALUE_DECODE: "Bolivia (Plurinational State of)", VALUE: "BO" },
      { VALUE_DECODE: "Bonaire, Sint Eustatius and Saba", VALUE: "BQ" },
      { VALUE_DECODE: "Brazil", VALUE: "BR" },
      { VALUE_DECODE: "Bahamas", VALUE: "BS" },
      { VALUE_DECODE: "Bhutan", VALUE: "BT" },
      { VALUE_DECODE: "Bouvet Island", VALUE: "BV" },
      { VALUE_DECODE: "Botswana", VALUE: "BW" },
      { VALUE_DECODE: "Belarus", VALUE: "BY" },
      { VALUE_DECODE: "Belize", VALUE: "BZ" },
      { VALUE_DECODE: "Canada", VALUE: "CA" },
      { VALUE_DECODE: "Cocos (Keeling) Islands", VALUE: "CC" },
      { VALUE_DECODE: "Democratic Republic of the Congo", VALUE: "CD" },
      { VALUE_DECODE: "Central African Republic", VALUE: "CF" },
      { VALUE_DECODE: "Congo", VALUE: "CG" },
      { VALUE_DECODE: "Switzerland", VALUE: "CH" },
      { VALUE_DECODE: "Côte d'Ivoire", VALUE: "CI" },
      { VALUE_DECODE: "Cook Islands", VALUE: "CK" },
      { VALUE_DECODE: "Chile", VALUE: "CL" },
      { VALUE_DECODE: "Cameroon", VALUE: "CM" },
      { VALUE_DECODE: "China", VALUE: "CN" },
      { VALUE_DECODE: "Colombia", VALUE: "CO" },
      { VALUE_DECODE: "Costa Rica", VALUE: "CR" },
      { VALUE_DECODE: "Cuba", VALUE: "CU" },
      { VALUE_DECODE: "Cape Verde", VALUE: "CV" },
      { VALUE_DECODE: "Curaçao", VALUE: "CW" },
      { VALUE_DECODE: "Christmas Island", VALUE: "CX" },
      { VALUE_DECODE: "Cyprus", VALUE: "CY" },
      { VALUE_DECODE: "Czech Republic", VALUE: "CZ" },
      { VALUE_DECODE: "Germany", VALUE: "DE" },
      { VALUE_DECODE: "Djibouti", VALUE: "DJ" },
      { VALUE_DECODE: "Denmark", VALUE: "DK" },
      { VALUE_DECODE: "Dominica", VALUE: "DM" },
      { VALUE_DECODE: "Dominican Republic", VALUE: "DO" },
      { VALUE_DECODE: "Algeria", VALUE: "DZ" },
      { VALUE_DECODE: "Ecuador", VALUE: "EC" },
      { VALUE_DECODE: "Estonia", VALUE: "EE" },
      { VALUE_DECODE: "Egypt", VALUE: "EG" },
      { VALUE_DECODE: "Western Sahara", VALUE: "EH" },
      { VALUE_DECODE: "Eritrea", VALUE: "ER" },
      { VALUE_DECODE: "Spain", VALUE: "ES" },
      { VALUE_DECODE: "Ethiopia", VALUE: "ET" },
      { VALUE_DECODE: "Finland", VALUE: "FI" },
      { VALUE_DECODE: "Fiji", VALUE: "FJ" },
      { VALUE_DECODE: "Micronesia (Federated States of)", VALUE: "FM" },
      { VALUE_DECODE: "Faroe Islands", VALUE: "FO" },
      { VALUE_DECODE: "France", VALUE: "FR" },
      { VALUE_DECODE: "Gabon", VALUE: "GA" },
      { VALUE_DECODE: "United Kingdom", VALUE: "GB" },
      { VALUE_DECODE: "Grenada", VALUE: "GD" },
      { VALUE_DECODE: "Georgia", VALUE: "GE" },
      { VALUE_DECODE: "French Guiana", VALUE: "GF" },
      { VALUE_DECODE: "Guernsey", VALUE: "GG" },
      { VALUE_DECODE: "Ghana", VALUE: "GH" },
      { VALUE_DECODE: "Gibraltar", VALUE: "GI" },
      { VALUE_DECODE: "Greenland", VALUE: "GL" },
      { VALUE_DECODE: "Gambia", VALUE: "GM" },
      { VALUE_DECODE: "Guinea", VALUE: "GN" },
      { VALUE_DECODE: "Guadeloupe", VALUE: "GP" },
      { VALUE_DECODE: "Equatorial Guinea", VALUE: "GQ" },
      { VALUE_DECODE: "Greece", VALUE: "GR" },
      { VALUE_DECODE: "South Georgia and the South Sandwich Islands", VALUE: "GS" },
      { VALUE_DECODE: "Guatemala", VALUE: "GT" },
      { VALUE_DECODE: "Guam", VALUE: "GU" },
      { VALUE_DECODE: "Guinea-Bissau", VALUE: "GW" },
      { VALUE_DECODE: "Guyana", VALUE: "GY" },
      { VALUE_DECODE: "Hong Kong, China", VALUE: "HK" },
      { VALUE_DECODE: "Heard Island and McDonald Islands", VALUE: "HM" },
      { VALUE_DECODE: "Honduras", VALUE: "HN" },
      { VALUE_DECODE: "Croatia", VALUE: "HR" },
      { VALUE_DECODE: "Haiti", VALUE: "HT" },
      { VALUE_DECODE: "Hungary", VALUE: "HU" },
      { VALUE_DECODE: "Indonesia", VALUE: "ID" },
      { VALUE_DECODE: "Ireland", VALUE: "IE" },
      { VALUE_DECODE: "Israel", VALUE: "IL" },
      { VALUE_DECODE: "Isle of man", VALUE: "IM" },
      { VALUE_DECODE: "India", VALUE: "IN" },
      { VALUE_DECODE: "British Indian Ocean Territory", VALUE: "IO" },
      { VALUE_DECODE: "Iraq", VALUE: "IQ" },
      { VALUE_DECODE: "Iran (Islamic Republic of)", VALUE: "IR" },
      { VALUE_DECODE: "Iceland", VALUE: "IS" },
      { VALUE_DECODE: "Italy", VALUE: "IT" },
      { VALUE_DECODE: "Jersey", VALUE: "JE" },
      { VALUE_DECODE: "Jamaica", VALUE: "JM" },
      { VALUE_DECODE: "Jordan", VALUE: "JO" },
      { VALUE_DECODE: "Japan", VALUE: "JP" },
      { VALUE_DECODE: "Kenya", VALUE: "KE" },
      { VALUE_DECODE: "Kyrgyzstan", VALUE: "KG" },
      { VALUE_DECODE: "Cambodia", VALUE: "KH" },
      { VALUE_DECODE: "Kiribati", VALUE: "KI" },
      { VALUE_DECODE: "Comoros", VALUE: "KM" },
      { VALUE_DECODE: "Saint Kitts and Nevis", VALUE: "KN" },
      { VALUE_DECODE: "Democratic People's Republic of Korea", VALUE: "KP" },
      { VALUE_DECODE: "Korea", VALUE: "KR" },
      { VALUE_DECODE: "Kuwait", VALUE: "KW" },
      { VALUE_DECODE: "Cayman Islands", VALUE: "KY" },
      { VALUE_DECODE: "Kazakhstan", VALUE: "KZ" },
      { VALUE_DECODE: "Lao People's Democratic Republic", VALUE: "LA" },
      { VALUE_DECODE: "Lebanon", VALUE: "LB" },
      { VALUE_DECODE: "Saint Lucia", VALUE: "LC" },
      { VALUE_DECODE: "Liechtenstein", VALUE: "LI" },
      { VALUE_DECODE: "Sri Lanka", VALUE: "LK" },
      { VALUE_DECODE: "Liberia", VALUE: "LR" },
      { VALUE_DECODE: "Lesotho", VALUE: "LS" },
      { VALUE_DECODE: "Lithuania", VALUE: "LT" },
      { VALUE_DECODE: "Luxembourg", VALUE: "LU" },
      { VALUE_DECODE: "Latvia", VALUE: "LV" },
      { VALUE_DECODE: "Libya", VALUE: "LY" },
      { VALUE_DECODE: "Morocco", VALUE: "MA" },
      { VALUE_DECODE: "Monaco", VALUE: "MC" },
      { VALUE_DECODE: "Moldova (Republic of)", VALUE: "MD" },
      { VALUE_DECODE: "Montenegro", VALUE: "ME" },
      { VALUE_DECODE: "Saint Martin", VALUE: "MF" },
      { VALUE_DECODE: "Madagascar", VALUE: "MG" },
      { VALUE_DECODE: "Marshall Islands", VALUE: "MH" },
      { VALUE_DECODE: "Former Yugoslav Republic of Macédoine", VALUE: "MK" },
      { VALUE_DECODE: "Mali", VALUE: "ML" },
      { VALUE_DECODE: "Myanmar", VALUE: "MM" },
      { VALUE_DECODE: "Mongolia", VALUE: "MN" },
      { VALUE_DECODE: "Macau, China", VALUE: "MO" },
      { VALUE_DECODE: "Northern Mariana Islands", VALUE: "MP" },
      { VALUE_DECODE: "Martinique", VALUE: "MQ" },
      { VALUE_DECODE: "Mauritania", VALUE: "MR" },
      { VALUE_DECODE: "Montserrat", VALUE: "MS" },
      { VALUE_DECODE: "Malta", VALUE: "MT" },
      { VALUE_DECODE: "Mauritius", VALUE: "MU" },
      { VALUE_DECODE: "Maldives", VALUE: "MV" },
      { VALUE_DECODE: "Malawi", VALUE: "MW" },
      { VALUE_DECODE: "Mexico", VALUE: "MX" },
      { VALUE_DECODE: "Malaysia", VALUE: "MY" },
      { VALUE_DECODE: "Mozambique", VALUE: "MZ" },
      { VALUE_DECODE: "Namibia", VALUE: "NA" },
      { VALUE_DECODE: "New Caledonia", VALUE: "NC" },
      { VALUE_DECODE: "Niger", VALUE: "NE" },
      { VALUE_DECODE: "Norfolk Island", VALUE: "NF" },
      { VALUE_DECODE: "Nigeria", VALUE: "NG" },
      { VALUE_DECODE: "Nicaragua", VALUE: "NI" },
      { VALUE_DECODE: "Netherlands", VALUE: "NL" },
      { VALUE_DECODE: "Norway", VALUE: "NO" },
      { VALUE_DECODE: "Nepal", VALUE: "NP" },
      { VALUE_DECODE: "Nauru", VALUE: "NR" },
      { VALUE_DECODE: "Niue", VALUE: "NU" },
      { VALUE_DECODE: "New Zealand", VALUE: "NZ" },
      { VALUE_DECODE: "Oman", VALUE: "OM" },
      { VALUE_DECODE: "other", VALUE: "other" },
      { VALUE_DECODE: "Panama", VALUE: "PA" },
      { VALUE_DECODE: "Peru", VALUE: "PE" },
      { VALUE_DECODE: "French Polynesia", VALUE: "PF" },
      { VALUE_DECODE: "Papua New Guinea", VALUE: "PG" },
      { VALUE_DECODE: "Philippines", VALUE: "PH" },
      { VALUE_DECODE: "Pakistan", VALUE: "PK" },
      { VALUE_DECODE: "Poland", VALUE: "PL" },
      { VALUE_DECODE: "Saint Pierre and Miquelon", VALUE: "PM" },
      { VALUE_DECODE: "Pitcairn", VALUE: "PN" },
      { VALUE_DECODE: "Puerto Rico", VALUE: "PR" },
      { VALUE_DECODE: "Palestinian Authority", VALUE: "PS" },
      { VALUE_DECODE: "Portugal", VALUE: "PT" },
      { VALUE_DECODE: "Palau", VALUE: "PW" },
      { VALUE_DECODE: "Paraguay", VALUE: "PY" },
      { VALUE_DECODE: "Qatar", VALUE: "QA" },
      { VALUE_DECODE: "Réunion", VALUE: "RE" },
      { VALUE_DECODE: "Romania", VALUE: "RO" },
      { VALUE_DECODE: "Serbia", VALUE: "RS" },
      { VALUE_DECODE: "Russian Federation", VALUE: "RU" },
      { VALUE_DECODE: "Rwanda", VALUE: "RW" },
      { VALUE_DECODE: "Saudi Arabia", VALUE: "SA" },
      { VALUE_DECODE: "Solomon Islands", VALUE: "SB" },
      { VALUE_DECODE: "Seychelles", VALUE: "SC" },
      { VALUE_DECODE: "Sudan", VALUE: "SD" },
      { VALUE_DECODE: "Sweden", VALUE: "SE" },
      { VALUE_DECODE: "Singapore", VALUE: "SG" },
      { VALUE_DECODE: "Saint Helena, Ascension and Tristan da Cunha", VALUE: "SH" },
      { VALUE_DECODE: "Slovenia", VALUE: "SI" },
      { VALUE_DECODE: "Svalbard and Jan Mayen", VALUE: "SJ" },
      { VALUE_DECODE: "Slovak Republic", VALUE: "SK" },
      { VALUE_DECODE: "Sierra Leone", VALUE: "SL" },
      { VALUE_DECODE: "San Marino", VALUE: "SM" },
      { VALUE_DECODE: "Senegal", VALUE: "SN" },
      { VALUE_DECODE: "Somalia", VALUE: "SO" },
      { VALUE_DECODE: "Suriname", VALUE: "SR" },
      { VALUE_DECODE: "South Sudan", VALUE: "SS" },
      { VALUE_DECODE: "Sao Tome and Principe", VALUE: "ST" },
      { VALUE_DECODE: "El Salvador", VALUE: "SV" },
      { VALUE_DECODE: "Sint Maarten", VALUE: "SX" },
      { VALUE_DECODE: "Syrian Arab Republic", VALUE: "SY" },
      { VALUE_DECODE: "Swaziland", VALUE: "SZ" },
      { VALUE_DECODE: "Turks and Caicos Islands", VALUE: "TC" },
      { VALUE_DECODE: "Chad", VALUE: "TD" },
      { VALUE_DECODE: "French Southern Territories", VALUE: "TF" },
      { VALUE_DECODE: "Togo", VALUE: "TG" },
      { VALUE_DECODE: "Thailand", VALUE: "TH" },
      { VALUE_DECODE: "Tajikistan", VALUE: "TJ" },
      { VALUE_DECODE: "Tokelau", VALUE: "TK" },
      { VALUE_DECODE: "Timor-Leste", VALUE: "TL" },
      { VALUE_DECODE: "Turkmenistan", VALUE: "TM" },
      { VALUE_DECODE: "Tunisia", VALUE: "TN" },
      { VALUE_DECODE: "Tonga", VALUE: "TO" },
      { VALUE_DECODE: "Turkey", VALUE: "TR" },
      { VALUE_DECODE: "Trinidad and Tobago", VALUE: "TT" },
      { VALUE_DECODE: "Tuvalu", VALUE: "TV" },
      { VALUE_DECODE: "Chinese Taipei", VALUE: "TW" },
      { VALUE_DECODE: "Tanzania (United Republic of)", VALUE: "TZ" },
      { VALUE_DECODE: "Ukraine", VALUE: "UA" },
      { VALUE_DECODE: "Uganda", VALUE: "UG" },
      { VALUE_DECODE: "United States Minor Outlying Islands", VALUE: "UM" },
      { VALUE_DECODE: "United States", VALUE: "US" },
      { VALUE_DECODE: "Uruguay", VALUE: "UY" },
      { VALUE_DECODE: "Uzbekistan", VALUE: "UZ" },
      { VALUE_DECODE: "Holy See", VALUE: "VA" },
      { VALUE_DECODE: "Saint Vincent and the Grenadines", VALUE: "VC" },
      { VALUE_DECODE: "Venezuela (Bolivarian Republic of)", VALUE: "VE" },
      { VALUE_DECODE: "British Virgin Islands", VALUE: "VG" },
      { VALUE_DECODE: "Virgin Islands, U.S.", VALUE: "VI" },
      { VALUE_DECODE: "Viet Nam", VALUE: "VN" },
      { VALUE_DECODE: "Vanuatu", VALUE: "VU" },
      { VALUE_DECODE: "Wallis And Futuna", VALUE: "WF" },
      { VALUE_DECODE: "Samoa", VALUE: "WS" },
      { VALUE_DECODE: "Yemen", VALUE: "YE" },
      { VALUE_DECODE: "Mayotte", VALUE: "YT" },
      { VALUE_DECODE: "South Africa", VALUE: "ZA" },
      { VALUE_DECODE: "Zambia", VALUE: "ZM" },
      { VALUE_DECODE: "Zimbabwe", VALUE: "ZW" }
    ];
  }

  getOtherValue() {
    return 'other';
  }
}

