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
import './jspm_packages/github/twbs/bootstrap@3.3.6/css/bootstrap.min.css!';
import './css/styles.css!';
import './css/angular-ui-tree.css!';
import './css/app.css!';

var app = angular.module('ghstsApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngMessages']);

app.config(config)
    .provider('pickListService', PickListService)
    .service('legalEntityService', ['$q', LegalEntityService])
    .controller('legalEntityController', ['$mdSidenav', '$location', 'pickListService', '$mdDialog', 'legalEntityService', LegalEntityController])
    .service('receiverService', ['$q', 'legalEntityService', ReceiverService])
    .controller('receiverController', ['$mdDialog', '$mdSidenav', 'receiverService', 'legalEntityService', ReceiverController])
    .service('productService', ['$q', ProductService])
    .controller('productController', ['$mdDialog', 'receiverService', 'productService', 'substanceService', 'pickListService', ProductController])
    .service('ghstsService', ['receiverService', 'legalEntityService', 'productService', 'dossierService', 'substanceService', 'documentService', 'fileService', GhstsService])
    .controller('ghstsController', ['$mdDialog', 'ghstsService', GhstsController])
    .service('fileService', ['$q', FileService])
    .controller('fileController', ['$mdDialog','$mdSidenav', 'fileService', FileController])
    .service('documentService', ['$q', DocumentService])
    .controller('documentController', ['$mdSidenav', '$location','pickListService','$mdDialog', 'documentService', 'fileService', 'substanceService', DocumentController])
    .service('dossierService', ['$q', DossierService])
    .controller('dossierController', ['$mdDialog', 'dossierService', 'pickListService', 'receiverService', DossierController])
    .service('substanceService', ['$q', SubstanceService])
    .controller('substanceController', ['$mdDialog', 'substanceService', SubstanceController])
    .controller('homeController', ['$rootScope', '$location', '$mdDialog', 'ghstsService', HomeController]);


function config($routeProvider, $mdThemingProvider, $mdIconProvider, $controllerProvider, $provide, $compileProvider, $filterProvider) {
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
        .when('/demoTOC', {
            templateUrl: './scripts/toc/tocview.html',
            controller: 'TocController'
        })
        .when('/manage', {
            templateUrl: './scripts/manage/manage.html'
        });
    $routeProvider.otherwise({ redirectTo: '/home' });

    // set the theme
    let newTheme = $mdThemingProvider.extendPalette('blue', {
        '500': '#11629A'
    });
    $mdThemingProvider.definePalette('oecdColours', newTheme);
    $mdThemingProvider.theme('default').primaryPalette('oecdColours');
    // test color
    //$mdThemingProvider.theme('default').primaryPalette('pink').accentPalette('orange');

    $mdIconProvider
        .icon('home-black', 'img/ic_home_black_24px.svg')
        .icon('home', 'img/ic_home_white_24px.svg')
        .icon('menu-black', 'img/ic_menu_black_24px.svg')
        .icon('menu', 'img/ic_menu_white_24px.svg')
        .icon('add-black', 'img/ic_add_black_24px.svg')
        .icon('add', 'img/ic_add_white_24px.svg')
        .icon('add-circle-black', 'img/ic_add_circle_black_24px.svg')
        .icon('add-circle', 'img/ic_add_circle_white_24px.svg')
        .icon('add-box-black', 'img/ic_add_box_black_24px.svg')
        .icon('add-box', 'img/ic_add_box_white_24px.svg')
        .icon('edit-black', 'img/ic_mode_edit_black_24px.svg')
        .icon('edit', 'img/ic_mode_edit_white_24px.svg')
        .icon('check-black', 'img/ic_business_black_24px.svg')
        .icon('check', 'img/ic_business_white_24px.svg')
        .icon('close-black', 'img/ic_close_black_24px.svg')
        .icon('close', 'img/ic_close_white_24px.svg')
        .icon('done-black', 'img/ic_done_black_24px.svg')
        .icon('done', 'img/ic_done_white_24px.svg')
        .icon('assignment-black', 'img/ic_assignment_black_24px.svg')
        .icon('assignment', 'img/ic_assignment_white_24px.svg')
        .icon('business-black', 'img/ic_business_black_24px.svg')
        .icon('business', 'img/ic_business_white_24px.svg')
        .icon('back-black', 'img/ic_chevron_left_black_24px.svg')
        .icon('back', 'img/ic_chevron_left_white_24px.svg')
        .icon('forward-black', 'img/ic_chevron_right_black_24px.svg')
        .icon('forward', 'img/ic_chevron_right_white_24px.svg')
        .icon('expand-black', 'img/ic_expand_black_24px.svg')
        .icon('expand', 'img/ic_expand_white_24px.svg')
        .icon('person-black', 'img/ic_person_black_24px.svg')
        .icon('person', 'img/ic_person_white_24px.svg')
        .icon('person-add-black', 'img/ic_person_add_black_24px.svg')
        .icon('person-add', 'img/ic_person_add_white_24px.svg')
        .icon('visibility-black', 'img/ic_visibility_black_24px.svg')
        .icon('visiblity', 'img/ic_visibility_white_24px.svg')
        .icon('folder-black', 'img/ic_folder_black_24px.svg')
        .icon('folder', 'img/ic_folder_white_24px.svg')
        .icon('description-black', 'img/ic_folder_black_24px.svg')
        .icon('description', 'img/ic_folder_white_24px.svg');

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

config.$inject = ['$routeProvider', '$mdThemingProvider', '$mdIconProvider', '$controllerProvider', '$provide', '$compileProvider', '$filterProvider'];
