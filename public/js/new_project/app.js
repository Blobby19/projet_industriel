/**
 * Created by Luc on 22/03/2016.
 */

'use strict';

var app = angular.module('app', ['ngRoute', 'multiStepForm']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'templates/new_project/index.html',
            controller: 'IndexCtrl'
        })
        .when('/config', {
            templateUrl: 'templates/new_project/configuration.html',
            controller: 'ConfigCtrl'
        })
        .when('/inputs', {
            templateUrl: 'templates/new_project/inputs.html',
            controller: 'InputCtrl'
        })
        .when('/outputs', {
            templateUrl: 'templates/new_project/outputs.html',
            controller: 'OutputCtrl'
        })
        .when('/modes', {
            templateUrl:'templates/new_project/modes.html',
            controller: 'ModesCtrl'
        })
        .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode({enabled: false, requireBase: false , rewriteLinks: true});
}]);