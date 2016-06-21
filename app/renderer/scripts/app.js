import angular from 'angular';
import ngRouter from 'angular-route';
import ngMaterial from 'angular-material';
import ngAnimate from '../jspm_packages/github/angular/bower-angular-animate@1.4.9/angular-animate';
import ngMessages from 'angular-messages';
import {LegalEntityService} from './legal_entity/legalEntityService';
import {LegalEntityController} from './legal_entity/legalEntityController';
import {ProductService} from './product/productService';
import {ProductController} from './product/productController';
import {ReceiverService} from './receiver/receiverService';
import {ReceiverController} from './receiver/receiverController';
import {FileService} from './file/fileService';
import {FileController} from './file/fileController';
import {DocumentService} from './document/documentService';
import {DocumentController} from './document/documentController';
import {DossierService} from './dossier/dossierService';
import {DossierController} from './dossier/dossierController';
import {SubstanceService} from './substance/substanceService';
import {SubstanceController} from './substance/substanceController';
import {GhstsService} from './ghsts_demo/ghstsService';
import {GhstsController} from './ghsts_demo/ghstsController';
import {PickListService} from './common/pickListService';

// notice stylesheet loading from app.js
import '../jspm_packages/github/angular/bower-material@1.0.4/angular-material.css!';

import '../styles.css!';
import '../css/bootstrap.css!';
import '../css/angular-ui-tree.css!';
import '../css/app.css!';

var app = angular.module('ghstsApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngMessages']);

    app.config(config)
    .service('pickListService', [PickListService])
    .service('legalEntityService', ['$q', LegalEntityService])
    .controller('legalEntityController', ['$mdSidenav', '$location', 'pickListService', '$mdDialog', 'legalEntityService', LegalEntityController])
    .service('receiverService', ['$q', 'legalEntityService', ReceiverService])
    .controller('receiverController', ['$mdDialog', '$mdSidenav', 'receiverService', 'legalEntityService', ReceiverController])
    .service('productService', ['$q', ProductService])
    .controller('productController', ['$mdDialog', 'receiverService', 'productService', 'substanceService', 'pickListService', ProductController])
    .service('ghstsService', ['receiverService', 'legalEntityService', 'productService', 'dossierService', 'substanceService','documentService', GhstsService])
    .controller('ghstsController', ['$mdDialog', 'ghstsService', GhstsController])
    .service('fileService', ['$q', FileService])
    .controller('fileController', ['$mdDialog','$mdSidenav', 'fileService', FileController])
    .service('documentService', ['$q', DocumentService])
    .controller('documentController', ['$mdSidenav', '$location','pickListService','$mdDialog', 'documentService','fileService','substanceService', DocumentController])
    .service('dossierService', ['$q', DossierService])
    .controller('dossierController', ['$mdDialog', 'dossierService', 'pickListService', 'receiverService', DossierController])
    .service('substanceService', ['$q', SubstanceService])
    .controller('substanceController', ['$mdDialog', 'substanceService', SubstanceController]);


function config($routeProvider, $mdThemingProvider, $controllerProvider, $provide, $compileProvider, $filterProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: './home.html',
            // NOTE, we need this for right now, as we need pickListService
            // to instantiate as soon as possible. Giving it a controller that
            // requires pickListService as a controller forces it to be made
            // We should move
            // pickListService to a separate module, and inject it into the
            // main module as a dependency
            controller: LegalEntityController
        })
        .when('/demoGHSTS', {
            templateUrl: './scripts/ghsts_demo/ghsts.html',
            controller: GhstsController,
            controllerAs: '_ctrl'
        })
        .when('/manageLE', {
            templateUrl: './scripts/legal_entity/le-manage.html',
            controller: LegalEntityController,
            controllerAs: '_ctrl'
        })
        .when('/manageProduct', {
            templateUrl: './scripts/product/product-manage.html',
            controller: ProductController,
            controllerAs: '_ctrl'
        })
        .when('/manageRcvr', {
            templateUrl: './scripts/receiver/receiver-manage.html',
            controller: ReceiverController,
            controllerAs: '_ctrl'
        })
        .when('/manageFile', {
            templateUrl: './scripts/file/file-manager.html',
            controller: FileController,
            controllerAs: '_ctrl'
        })
        .when('/manageDoc', {
            templateUrl: './scripts/document/document-manage.html' ,
            controller: DocumentController,
            controllerAs: '_ctrl'
        })
        .when('/dossier', {
            templateUrl: './scripts/dossier/dossier-manage.html',
            controller: DossierController,
            controllerAs: '_ctrl'
        })
        .when('/manageSub', {
            templateUrl: './scripts/substance/substance-manage.html' ,
            controller: SubstanceController,
            controllerAs: '_ctrl'
        })
        .when('/manage', {
            templateUrl: './manage.html'
        })
        .when('/demoTOC', {
            templateUrl: './scripts/toc/tocview.html', 
            controller: 'TocController'
        });
    $routeProvider.otherwise({ redirectTo: '/home' });

    // set the theme
    $mdThemingProvider.theme('default');
    // test color
    //$mdThemingProvider.theme('default').primaryPalette('pink').accentPalette('orange');

    app._controller = app.controller;
    app._service = app.service;
    app._factory = app.factory;
    app._value = app.value;
    app._directive = app.directive;

    app.controller = function(name, constructor){
        $controllerProvider.register(name, constructor);
        return (this);
    }

    app.service = function(name, constructor){
        $provide.service(name, constructor);
        return(this);
    }

    app.factory = function(name, factory){
        $provide.factory(name, factory);
        return (this);
    }

    app.value = function(name, value){
        $provide.value(name, value);
        return (this);
    }

    app.constant = function(name, value){
        $provide.constant(name, value);
    }

    app.directive = function(name, factory){
        $compileProvider.directive(name, factory);
        return (this);
    }

    app.filter = function(name, factory){
        $filterProvider.register(name, constructor);
    }
}

config.$inject = ['$routeProvider', '$mdThemingProvider', '$controllerProvider', '$provide', '$compileProvider', '$filterProvider'];
