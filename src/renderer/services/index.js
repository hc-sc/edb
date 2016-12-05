import angular from 'angular';

let services = angular.module('app.services', []);

import ModelService from './model.service';
services.service('ModelService', ModelService);

export default services.name;