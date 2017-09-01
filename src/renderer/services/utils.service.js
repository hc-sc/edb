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
export function getNestedProperty(obj, propString) {
  let ref = obj;
  propString.split('.').forEach(prop => {
    ref = ref[prop];
  });
  return ref;
}

/**
 * Sort By Locale
 * @param array Array the array to sort
 * @param desc Boolean whether the sorted list should be reversed
 * @param propName String if the arrays items are objects, which property to key off of
 * @returns Array the sorted array
 */
export function sortByLocale(array, desc = false, propName) {
  return array.sort((a, b) => {
    let comp;
    let x = a[propName], y = b[propName];

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