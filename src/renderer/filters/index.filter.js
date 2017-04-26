import angular from 'angular';

export default angular.module('utils', [])
.filter('index', () => {
  return (array, index) => {
    console.log(array);
    if (!index) index = 'index';
    if (!array) array = [];
    for (let i = 0; i < array.length; ++i) {
      array[i][index] = i;
    }
    return array;
  };
})
.name;