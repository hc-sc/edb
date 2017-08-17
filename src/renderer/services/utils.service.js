import {escapeRegExp} from 'lodash';

export function isStringMatch(word, test, noCase = true, global = true) {
  return new RegExp(
    escapeRegExp(test), (noCase ? 'i' : '') + (global ? 'g' : '')
  ).test(word);
}

export function getNestedProperty(obj, propString) {
  let ref = obj;
  propString.split('.').forEach(prop => {
    ref = ref[prop];
  });
  return ref;
}