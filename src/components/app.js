import angular from 'angular';
import 'angular-ui-router';
import 'angular-ui-tree';
import 'angular-material';
import 'angular-animate';
import 'bluebird';
import 'jquery';
// import 'bootstrap';

// For JSPM
import '../css/style.css!';

// For webpack
// import '../css/style.css';

import Home from './home/home.component';
import Project from './project/project.component';
import Dropdowns from './dropdowns/dropdowns.component';
import Edit from './edit/edit.component';
import Settings from './settings/settings.component';

import icons from './app/app.icons';
import states from './app/app.states';

angular.module('app', [
  'ui.router',
  'ngMaterial',
  'ngAnimate',
  Home.name,
  Project.name,
  Edit.name,
  Settings.name,
  Dropdowns.name
])
.config(icons)
.config(states);