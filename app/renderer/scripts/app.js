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

angular.module('ghstsApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngMessages'])
    .config(config)
    .service('pickListService', [PickListService])
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
    .controller('documentController', ['$mdSidenav', '$location','pickListService','$mdDialog', 'documentService','fileService', DocumentController])
    .service('dossierService', ['$q', DossierService])
    .controller('dossierController', ['$mdDialog', 'dossierService', 'pickListService'])
    .service('substanceService', ['$q', SubstanceService])
    .controller('substanceController', ['$mdDialog', 'substanceService']);


function config($routeProvider, $mdThemingProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: './splash.html',
            controller: LegalEntityController,
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
        });
    $routeProvider.otherwise({ redirectTo: '/home' });

    // set the theme
    $mdThemingProvider.theme('default');
    // test color
    //$mdThemingProvider.theme('default').primaryPalette('pink').accentPalette('orange');
}

config.$inject = ['$routeProvider', '$mdThemingProvider'];

