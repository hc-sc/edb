import angular from 'angular';

export default angular.module('utils', [])
.filter('index', () => {
  return (array, index) => {
    if (!index) index = 'index';
    for (let i = 0; i < array.length; ++i) {
      array[i][index] = i;
    }
    return array;
  };
})
.name;