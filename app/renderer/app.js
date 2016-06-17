import angular from 'angular';
import ngRouter from 'angular-route';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';
import {LegalEntityService} from './scripts/legal_entity/legalEntityService';
import {LegalEntityController} from './scripts/legal_entity/legalEntityController';
import {ProductService} from './scripts/product/productService';
import {ProductController} from './scripts/product/productController';
import {ReceiverService} from './scripts/receiver/receiverService';
import {ReceiverController} from './scripts/receiver/receiverController';
import {FileService} from './scripts/file/fileService';
import {FileController} from './scripts/file/fileController';
import {DocumentService} from './scripts/document/documentService';
import {DocumentController} from './scripts/document/documentController';
import {DossierService} from './scripts/dossier/dossierService';
import {DossierController} from './scripts/dossier/dossierController';
import {SubstanceService} from './scripts/substance/substanceService';
import {SubstanceController} from './scripts/substance/substanceController';
import {GhstsService} from './scripts/ghsts_demo/ghstsService';
import {GhstsController} from './scripts/ghsts_demo/ghstsController';
import {HomeController} from './scripts/home/HomeController';
import {PickListService} from './scripts/common/pickListService';

// notice stylesheet loading from app.js
import './jspm_packages/github/angular/bower-material@1.0.4/angular-material.css!';

import './styles.css!';

angular.module('ghstsApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngMessages'])
    .config(config)
    .provider('pickListService', PickListService)
    .service('legalEntityService', ['$q', LegalEntityService])
    .controller('legalEntityController', ['$mdSidenav', '$location', 'pickListService', '$mdDialog', 'legalEntityService', LegalEntityController])
    .service('receiverService', ['$q', 'legalEntityService', ReceiverService])
    .controller('receiverController', ['$mdDialog', '$mdSidenav', 'receiverService', 'legalEntityService', ReceiverController])
    .service('productService', ['$q', ProductService])
    .controller('productController', ['$mdDialog', 'receiverService', 'productService', 'substanceService', 'pickListService', ProductController])
    .service('ghstsService', ['receiverService', 'legalEntityService', 'productService', 'dossierService', 'substanceService', GhstsService])
    .controller('ghstsController', ['$mdDialog', 'ghstsService', GhstsController])
    .service('fileService', ['$q', FileService])
    .controller('fileController', ['$mdDialog','$mdSidenav', 'fileService', FileController])
    .service('documentService', ['$q', DocumentService])
    .controller('documentController', ['$mdSidenav', '$location','pickListService','$mdDialog', 'documentService', DocumentController])
    .service('dossierService', ['$q', DossierService])
    .controller('dossierController', ['$mdDialog', 'dossierService', 'pickListService', 'receiverService', DossierController])
    .service('substanceService', ['$q', SubstanceService])
    .controller('substanceController', ['$mdDialog', 'substanceService'])
    .controller('homeController', ['$rootScope', '$location', 'ghstsService', HomeController]);


function config($routeProvider, $mdThemingProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: './scripts/home/home.html',
            controller: HomeController,
            controllerAs: '_ctrl'
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
        });
    $routeProvider.otherwise({ redirectTo: '/home' });

    // set the theme
    $mdThemingProvider.theme('default');
    // test color
    //$mdThemingProvider.theme('default').primaryPalette('pink').accentPalette('orange');
}

config.$inject = ['$routeProvider', '$mdThemingProvider'];
