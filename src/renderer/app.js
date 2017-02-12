import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngTranslate from 'angular-translate';
import ngMaterial from 'angular-material';
import mdDataTable from 'angular-material-data-table';
import 'angular-animate';
import 'angular-aria';
import 'bluebird';

import Spinner from './components/common/spinner/spinner.component';
import Splash from './components/splash/splash.component';
import Home from './components/home/home.component';
import Dossier from './components/dossier/dossier.component';
import Submission from './components/submission/submission.component';
import Globals from './components/globals/globals.component';
import Settings from './components/settings/settings.component';
import LegalEntities from './components/legal-entities/legal-entities.component';
import Substances from './components/substances/substances.component';
import Products from './components/products/products.component';
import Files from './components/files/files.component';
import Description from './components/description/description.component';
import Receivers from './components/receivers/receivers.component';
import Senders from './components/senders/senders.component';
import Documents from './components/documents/documents.component';
import TOC from './components/toc/toc.component';
import SubmissionNode from './components/submission-node/submission-node.component';
import Picklists from './components/picklists/picklists.component';

import Services from './services';

import states from './config/app.states';
import theme from './config/app.theme';
import icons from './config/app.icons';
import translations from './config/app.translations';

import 'angular-material/angular-material.scss';
import 'angular-material-data-table/dist/md-data-table.css';
import './scss//main.scss';

angular.module('app', [
  uiRouter,
  ngTranslate,
  ngMaterial,
  mdDataTable,
  Services,
  Spinner,
  Splash,
  Home,
  Dossier,
  Submission,
  Globals,
  Settings,
  LegalEntities,
  Substances,
  Products,
  Files,
  Picklists,
  Description,
  Receivers,
  Senders,
  Documents,
  TOC,
  SubmissionNode
])
.config(states)
.config(translations)
.config(theme)
.config(icons);