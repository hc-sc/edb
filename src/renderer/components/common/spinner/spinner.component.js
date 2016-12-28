import angular from 'angular'
import ngMaterial from 'angular-material';

export default angular.module('spinner', [
  ngMaterial
])
.component('spinner', {
  template: `
    <div layout='row' layout-align='space-around' style='padding-top:30px'>
      <md-progress-circular md-mode='indeterminate'</md-progress-circular>
    </div>`
})
.name;