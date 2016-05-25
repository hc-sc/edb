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
import {SubmissionController} from './submission/submissionController';
import {SubmissionService} from './submission/submissionService';
import {FileService} from './file/fileService';
import {FileController} from './file/fileController';
import {DocumentService} from './document/documentService'; 
import {DocumentController} from './document/documentController';
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
    .service('receiverService', ['$q', ReceiverService])
    .controller('receiverController', ['$mdDialog', '$mdSidenav', 'receiverService', 'legalEntityService', ReceiverController])
    .service('productService', ['$q', ProductService])
    .controller('productController', ['$mdDialog', 'productService', ProductController])
    .service('ghstsService', ['receiverService', 'legalEntityService', 'productService', 'submissionService', GhstsService])
    .controller('ghstsController', ['$mdDialog', 'ghstsService', GhstsController])
    .controller('receiverController', ['$mdDialog', 'receiverService', 'legalEntityService', ReceiverController])
    .service('fileService', ['$q', FileService])
    .controller('fileController', ['$mdDialog', 'fileService', FileController])
    .service('documentService', ['$q', DocumentService])
    .controller('documentController', ['$mdDialog', 'documentService', DocumentController])
    .service('submissionService', ['$q', SubmissionService])
    .controller('submissionController', ['$mdDialog', 'submissionService']);

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
            .when('/submission', {
                templateUrl: './scripts/submission/submission-manage.html',
                controller: SubmissionController,
                controllerAs: '_ctrl'
            });
    $routeProvider.otherwise({ redirectTo: '/home' });

    // set the theme
    $mdThemingProvider.theme('default');
    // test color
    //$mdThemingProvider.theme('default').primaryPalette('pink').accentPalette('orange');
}

config.$inject = ['$routeProvider', '$mdThemingProvider'];

