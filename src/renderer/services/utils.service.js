import {v4} from 'node-uuid';
import {escapeRegExp} from 'lodash';

/**
 * A more globally useable string matcher. Uses regex's, so needs to escape any in the string\
 * @param word String the word to be tested
 * @param test String the string to be converted into a regex
 * @param noCase Boolean, whether cases should be considered
 * @param global Boolean, whether global regex should be used
 * @returns Boolean, whether or not the word and test are matches
 */
export function isStringMatch(word, test, noCase = true, global = true) {
  return new RegExp(
    escapeRegExp(test), (noCase ? 'i' : '') + (global ? 'g' : '')
  ).test(word);
}

/**
 * Returns the reference to the nested property name (i.e. given 'person.address.street', returns a reference to 'street');
 * @param obj Object the object to be used
 * @param propString String the period separated nested property names
 * @returns Reference a reference to the nested property
 */
export function getNestedProperty(obj, propStrings) {
  let ref = obj;
  propStrings.split('.').forEach(prop => {
    ref = ref[prop];
  });
  return ref;
}

/**
 * Sort By Locale - custom function to sort based on locale specific languages
 * @param array Array the array to sort
 * @param desc Boolean whether the sorted list should be reversed
 * @param propName String if the arrays items are objects, which property to key off of
 * @returns Array the sorted array
 */
export function sortByLocale(array, desc = false, propName = null) {
  return array.sort((a, b) => {
    let comp, x = a, y = b;

    if (propName != null) {
      x = getNestedProperty(a, propName);
      y = getNestedProperty(b, propName);
    }

    const xtype = x === null ? 'null' : typeof x;
    const ytype = y === null ? 'null' : typeof y;

    if (xtype === 'object' && ytype === 'object') {
      return 0;
    }
    else if (x == null) {
      if (y != null) return -1;
      else return 0;
    }
    else if (x != null && (y == null || ytype === 'object')) {
      return 1;
    }
    else if (y != null && (x == null || xtype === 'object')) {
      return -1;
    }
    else {
      comp = x.toString().localeCompare(y.toString());
    }
    return desc ? -comp : comp;
  });
}

/**
 * Match Filter - used for further specific matching parameters
 * @param {Object} filter the filter object
 * @param {String} filterKey the prop of the filter to compare with
 * @param {String} filterValue the prop of the item to compare with
 * @param {Object} item the item used to compare
 */
export function matchFilter(filter, filterKey, filterValue, item) {
  if (filter == null || filter[filterKey] == null || filter[filterValue] == null || filter[filterKey] === '') {
    return true;
  }
  else if (filter[filterKey] === 'any') {
    if (filter[filterValue] === '') return true;
    let match = false;
    Object.entries(item).filter(entry => {
      return match || (match = (
        item[entry[0]].toString().toLowerCase().includes(filter[filterValue].toString().toLowerCase())
      ));
    });
    return match;
  }
  else {
    return item[filter[filterKey]].toString().toLowerCase().includes(filter[filterValue].toString().toLowerCase());
  }
}

/**
 * Match By - returns a function that returns the index of the first match
 * @param {String} propName: the property to match on
 * @returns {Number} the index of the first match, or -1
 */
export function matchBy(propName) {
  return (options, value) => {
    return options.findIndex(o => {
      return o[propName] === value;
    });
  };
}

/**
 * generatePID produces a new PID with a custom prefix
 * @param {String} prefix - the prefix to append
 * @returns {String} the PID
 */
export function generatePID(prefix = 'ghsts') {
  return `urn:${prefix}:${v4()}`;
}

const uuidString = '[0-9a-f]{8}-?[0-9a-f]{4}-?[0-5][0-9a-f]{3}-?[089ab][0-9a-f]{3}-?[0-9a-f]{12}';
export const validUUID = new RegExp(`^${uuidString}$`, 'i');
export const validPID = new RegExp(`^urn:[a-z]{1, 5}:${uuidString}$`, 'i');

/**
 * validatePID ensures a correct v4 uuid. It will generate a new one if it is
 * invalid.
 * @param {String} pid - the pid to analyse
 * @param {String} prefix - used if invalid to generate a new one
 * @returns {String} a valid UUID
 */
export function validatePID(pid = null, prefix = 'ghsts') {
  if (pid == null) return generatePID(prefix);
  pid.replace(/ /g, '');

  // if there is no prefix, append one
  if (pid.indexOf(':') === -1) {
    if (isValidUUID(pid)) {
      return `urn:${prefix}:${pid}`;
    }
    else return generatePID(prefix);
  }

  // otherwise check just the uuid
  else {
    if (isValidPID(pid, prefix)) return pid;
    else return generatePID(prefix);
  }
}

/**
 * isValidPID is used to determine if the uuid portion of a pid is valid
 * @param {String} pid - the pid to check. Can be with or without prefix
 */
export function isValidPID(pid, prefix = 'ghsts') {
  return pid.match(getValidPIDRegExp(prefix));
}

export function isValidUUID(pid) {
  return pid.match(validUUID);
}

export function getValidPIDRegExp(prefix = '[a-z]{1, 5}') {
  return new RegExp(`^urn:${prefix}:${uuidString}$`, 'i');
}

