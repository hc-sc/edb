
import 'angular-material/angular-material.css';
import '../scss/style.scss';
// import 'bootstrap/dist/css/bootstrap.css';

import 'bluebird';
import angular from 'angular';
import Router from 'angular-ui-router';
import Material from 'angular-material';
import Animate from 'angular-animate';

import Home from './home/home.component';
//import Project from './project/project.component';
//import Edit from './edit/edit.component';
//import Settings from './settings/settings.component';

import icons from './app/app.icons';
import states from './app/app.states';

angular.module('app', [
  Router,
  Material,
  Animate,
  Home.name
])
  .config(icons)
  .config(states);