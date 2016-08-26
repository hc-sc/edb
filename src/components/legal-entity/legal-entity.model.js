
import { ValueStruct, ExtValueStruct } from '../shared/shared.model';

class LegalEntityIdentifier {
  constructor(json) {
    if (arguments.length === 1) {
      this.IDENTIFIER = json.IDENTIFIER;
      //always be extValueStruct, just ATTR_VALUE or Not
      if (json.LEGALENTITY_IDENTIFIER_TYPE.ATTR_VALUE != undefined &&
        json.LEGALENTITY_IDENTIFIER_TYPE.ATTR_VALUE !== 'undefined') {
        this.LEGALENTITY_IDENTIFIER_TYPE = new ExtValueStruct(
          json.LEGALENTITY_IDENTIFIER_TYPE.VALUE,
          json.LEGALENTITY_IDENTIFIER_TYPE.VALUE_DECODE,
          json.LEGALENTITY_IDENTIFIER_TYPE.ATTR_VALUE
        );
      }
      else {
        this.LEGALENTITY_IDENTIFIER_TYPE = new ExtValueStruct(
          json.LEGALENTITY_IDENTIFIER_TYPE.VALUE,
          json.LEGALENTITY_IDENTIFIER_TYPE.VALUE_DECODE
        );
      }
    }
    else {
      this.IDENTIFIER = null;
      this.LEGALENTITY_IDENTIFIER_TYPE = new ExtValueStruct();
    }
  }

  setLEGALENTITY_IDENTIFIER_TYPEValue(value) {
    this.LEGALENTITY_IDENTIFIER_TYPE.VALUE = value;
  }

  setLEGALENTITY_IDENTIFIER_TYPEValueDecode(decode) {
    this.LEGALENTITY_IDENTIFIER_TYPE.VALUE_DECODE = decode;
  }

  toGhstsJson() {
    return {
      IDENTIFIER: this.IDENTIFIER,
      LEGALENTITY_IDENTIFIER_TYPE: this.LEGALENTITY_IDENTIFIER_TYPE.toGhstsJson()
    };
  }
}
class ContactPerson {
  constructor(organisation, department, title, firstName, lastName, phone, mobile, fax, email) {
    this.ORGANISATION = organisation;
    this.DEPARTMENT = department;
    this.TITLE = title;
    this.FIRSTNAME = firstName;
    this.LASTNAME = lastName;
    this.PHONE = phone;
    this.MOBILE = mobile;
    this.FAX = fax;
    this.EMAIL = email;
  }
}

class ContactAddress {
  /*
  constructor(street1, street2, zipCode, city, state, country, phone, fax, email, website) {
      this.STREET1 = street1;
      this.STREET2 = street2;
      this.ZIPCODE = zipCode;
      this.CITY = city;
      this.STATE = state;
      this.COUNTRY = country;     // of ValueStruct
      this.PHONE = phone;
      this.FAX = fax;
      this.EMAIL = email;
      this.WEBSITE = website;
  }
  */
  constructor(json) {
    if (arguments.length === 1) {
      this.STREET1 = json.STREET1;
      this.STREET2 = json.STREET2;
      this.ZIPCODE = json.ZIPCODE;
      this.CITY = json.CITY;
      this.STATE = json.STATE;
      this.COUNTRY = country;     // of ValueStruct
      this.PHONE = json.PHONE;
      this.FAX = json.FAX;
      this.EMAIL = json.EMAIL;
      this.WEBSITE = json.WEBSITE;
      if (json.COUNTRY.ATTR_VALUE != undefined &&
        json.COUNTRY.ATTR_VALUE !== 'undefined') {
        this.COUNTRY = new ExtValueStruct(
          json.COUNTRY.VALUE,
          json.COUNTRY.VALUE_DECODE,
          json.COUNTRY.ATTR_VALUE
        );
      }
      else {
        this.COUNTRY = new ExtValueStruct(
          json.COUNTRY.VALUE,
          json.COUNTRY.VALUE_DECODE
        );
      }
    }
    else {
      this.STREET1 = null;
      this.STREET2 = null;
      this.ZIPCODE = null;
      this.CITY = null;
      this.STATE = null;
      this.PHONE = null;
      this.FAX = null;
      this.EMAIL = null;
      this.WEBSITE = null;
      this.COUNTRY = new ExtValueStruct();
    }
  }

  setCOUNTRYValue(value) {
    this.COUNTRY.VALUE = value;
  }

  setCOUNTRYValueDecode(decode) {
    this.COUNTRY.VALUE_DECODE = decode;
  }

  toGhstsJson() {
    return {
      STREET1: this.STREET1,
      STREET2: this.STREET2,
      ZIPCODE: this.ZIPCODE,
      CITY: this.CITY,
      STATE: this.STATE,
      COUNTRY: this.COUNTRY.toGhstsJson(),
      PHONE: this.PHONE,
      FAX: this.FAX,
      EMAIL: this.EMAIL,
      WEBSITE: this.WEBSITE

    };
  }
}

class LegalEntity {
  constructor(json) {
    if (arguments.length === 1) {
      // load from json
      Object.assign(this, json);
      if (json.LEGALENTITY_TYPE.ATTR_VALUE != undefined &&
        json.LEGALENTITY_TYPE.ATTR_VALUE !== 'undefined') {
        this.LEGALENTITY_TYPE = new ExtValueStruct(
          json.LEGALENTITY_TYPE.VALUE,
          json.LEGALENTITY_TYPE.VALUE_DECODE,
          json.LEGALENTITY_TYPE.ATTR_VALUE
        );
      }
      else {
        this.LEGALENTITY_TYPE = new ExtValueStruct(
          json.LEGALENTITY_TYPE.VALUE,
          json.LEGALENTITY_TYPE.VALUE_DECODE
        );
      }
      this.LEGALENTITY_IDENTIFIER = json.LEGALENTITY_IDENTIFIER.map(ldr => {
        return new LegalEntityIdentifier(ldr);
      });
    } else {
      this._identifier = null;
      this.METADATA_STATUS = {};              // of ValueStruct
      this.LEGALENTITY_PID = null;
      this.LEGALENTITY_NAME = null;
      //     this.LEGALENTITY_TYPE = {};             // of ValueStruct
      this.LEGALENTITY_TYPE = new ExtValueStruct();
      /*

      */
      this.OTHER_NAME = [];
      this.LEGALENTITY_IDENTIFIER = [];       // list of LegalEntityIdentifier
      this.CONTACT_PERSON = [];               // list of ContactPerson
      this.CONTACT_ADDRESS = {};              // of ContactAddress
    }
  }

  set legalEntityId(id) {
    this._identifier = id;
  }
  addLeType(leType) {
    this.LEGALENTITY_TYPE.push(leType);
  }

  updateLeTypeValue(lt) {
    lt.setLegalEntityTypeValue(an.VALUE_DECODE);
  }
  addContact(contactPerson) {
    this.CONTACT_PERSON.push(contactPerson);
  }

  set contactAddress(contactAddress) {
    this.CONTACT_ADDRESS = contactAddress;
  }

  addOtherName(otherName) {
    this.OTHER_NAME.push(otherName);
  }

  addIdentifier(identifier) {
    this.LEGALENTITY_IDENTIFIER.push(new LegalEntityIdentifier(identifier));
  }

  toGHSTSJson() {
    let contactsJson = [];
    this.CONTACT_PERSON.forEach(contact => contactsJson.push(contact));
    let idsJson = [];
    this.LEGALENTITY_IDENTIFIER.forEach(id => idsJson.push(id));

    return {
      attr$: { Id: this._identifier },
      METADATA_STATUS: this.METADATA_STATUS,
      LEGALENTITY_PID: this.LEGALENTITY_PID,
      LEGALENTITY_NAME: this.LEGALENTITY_NAME,
      LEGALENTITY_TYPE: this.LEGALENTITY_TYPE,
      OTHER_NAME: this.OTHER_NAME,
      LEGALENTITY_IDENTIFIER: idsJson,
      CONTACT_ADDRESS: this.CONTACT_ADDRESS,
      CONTACT_PERSON: contactsJson
    };
  }
}

export {LegalEntityIdentifier, ContactPerson, ContactAddress, LegalEntity};