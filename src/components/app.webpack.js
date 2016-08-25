import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';
import 'angular-ui-tree';
import 'angular-animate';
import 'bluebird';

// For webpack
import '../css/style.css';

import Home from './home/home.component';
import Project from './project/project.component';
import Edit from './edit/edit.component';
import Settings from './settings/settings.component';
import AppFooter from './shared/app-footer/app-footer.component';

import icons from './app/app.icons';
import states from './app/app.states';
import themes from './app/app.themes';

angular.module('app', [
  'ui.router',
  'ngMaterial',
  Home.name,
  Project.name,
  Edit.name,
  Settings.name,
  AppFooter.name
])
.config(icons)
.config(states)
.config(themes);