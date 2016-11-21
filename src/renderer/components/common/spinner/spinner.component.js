import angular from 'angular'
import ngMaterial from 'angular-material';

export default angular.module('spinner', [
  ngMaterial
])
.component('spinner', {
  template: `
    <div layout='row' layout-align='space-around'>
      <md-progress-circular md-mode='indeterminate'</md-progress-circular>
    </div>`
})
.name;