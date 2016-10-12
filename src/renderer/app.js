import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import mdDataTable from 'angular-material-data-table';
import 'angular-animate';
import 'angular-aria';
import 'bluebird';

import Home from './components/home/home.component';
import Dossier from './components/dossier/dossier.component';
import Submission from './components/submission/submission.component';
import Settings from './components/settings/settings.component';

import states from './config/app.states';
import theme from './config/app.theme';
import icons from './config/app.icons';

import 'angular-material/angular-material.scss';
import 'angular-material-data-table/dist/md-data-table.css';
import './scss//main.scss';

angular.module('app', [
  uiRouter,
  ngMaterial,
  mdDataTable,
  Home,
  Dossier,
  Submission,
  Settings
])
.config(states)
.config(theme)
.config(icons);