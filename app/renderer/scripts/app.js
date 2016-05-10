import angular from 'angular';
import ngRouter from 'angular-route';
import ngMaterial from 'angular-material';
import ngAnimate from '../jspm_packages/github/angular/bower-angular-animate@1.4.9/angular-animate';
import ngMessages from 'angular-messages';

import {LegalEntityService} from './legal_entity/legalEntityService'; 
import {LegalEntityController} from './legal_entity/legalEntityController';

import {ReceiverService} from './receiver/receiverService'; 
import {ReceiverController} from './receiver/receiverController';

import {DocumentService} from './document/documentService'; 
import {DocumentController} from './document/documentController'; 

import {GhstsService} from './ghsts_demo/ghstsService'; 
import {GhstsController} from './ghsts_demo/ghstsController';

import {FileService} from './file/fileService';
import {FileController} from './file/fileController';

import SubmissionController from './submission/submissionController';
import SubmissionService from './submission/submissionService';


// notice stylesheet loading from app.js
import '../jspm_packages/github/angular/bower-material@1.0.4/angular-material.css!';

angular.module('ghstsApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngMessages'])
    .config(config)
    .service('legalEntityService', ['$q', LegalEntityService])
    .controller('legalEntityController', ['$mdDialog', 'legalEntityService', LegalEntityController])
    .service('receiverService', ['$q', ReceiverService])
    .controller('receiverController', ['$mdDialog', 'receiverService', 'legalEntityService', ReceiverController])
    .service('documentService', ['$q', DocumentService])
    .controller('documentController', ['$mdDialog', 'documentService', DocumentController])
    .service('fileService', ['$q', FileService])
    .controller('fileController', ['$mdDialog', 'fileService',FileController])
    .service('ghstsService', ['receiverService', 'legalEntityService', GhstsService])
    .controller('ghstsController', ['$mdDialog', 'ghstsService', GhstsController])
    .service('submissionService', ['$q', SubmissionService])
    .controller('submissionController', ['$mdDialog', 'submissionService']);

function config($routeProvider) {
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
        .when('/manageRcvr', {
            templateUrl: './scripts/receiver/receiver-manage.html',
            controller: ReceiverController,
            controllerAs: '_ctrl'
        })
        
        .when('/submission', {
            templateUrl: './scripts/submission/submission-manage.html',
            controller: SubmissionController,
            controllerAs: '_ctrl'
        })

        .when('/manageDoc', {
            templateUrl: './scripts/document/document-manage.html' ,
            controller: DocumentController,
            controllerAs: '_ctrl'
        })

        .when('/manageFile', {
            templateUrl: './scripts/file/file-manager.html',
            controller: FileController,
            controllerAs: '_ctrl'
        });
        

    $routeProvider.otherwise({ redirectTo: '/home' });
}

config.$inject = ['$routeProvider'];

