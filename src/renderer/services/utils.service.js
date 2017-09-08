import {escapeRegExp} from 'lodash';
import {BackendService} from '@/store/backend.service.js';
import moment from 'moment';

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
 * Sort By Locale - custom function to sort based on locale specific languages
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

/**
 * Match Filter - used for further specific matching parameters
 * @param filter Object the filter object
 * @param item Object the item to compare against
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
 * mapProjection allows for mapping a collection of rows into new ones with
 * only the desired headers. It can also replace cell data with a desired
 * value
 * @param {Array} projection - the desired columns. If it is
 * just a string, will use as is. If it's an object of the form
 * {id: String, url: String}, will replace the cell data with the
 * result of the database query for the id at the url table, or
 * fallback to the id
 * @param {Array} rows - the rows to be mapped
 * @returns {Array} - the altered rows
 */
export function mapProjection(projection, rows) {
  // map the rows to match the projected headers.
  // replace table ID's with corresponding values

  console.log(projection, rows);
  return rows.map(row => {
    let mappedRow = [];
    let query, result, cellData;

    for (let header of projection) {
      // if the header is a string, use that as the prop
      if (typeof header === 'string') {
        cellData = row[header];
      }

      // if it's not a string, need to retrieve the value from DB
      else {
        const id = row[header.id];

        // get matching picklist item
        if (header.url === 'picklist') {
          query = {_id: id};
          result = BackendService.searchPicklist(query);
          if (result && 'valuedecode' in result) {
            cellData = result['valuedecode'];
          }

          // fallback if no matching id
          else {
            cellData = row[header.name];
          }
        }

        // get matching app data item
        else {
          query = {
            url: header.url,
            data: query
          };

          result = BackendService.searchAppData(query);
          if (result && 'valuedecode' in result) {
            cellData = result['valuedecode'];
          }

          // fallback
          else {
            cellData = row[header.id];
          }
        }
      }

      // replace ISO dates with more human readable versions
      let date = moment(cellData, moment.ISO_8601, true);
      if (date._isValid) cellData = date.format('YYY-MM-DD');

      mappedRow.push(cellData);
    }

    return mappedRow;
  });
}