'use strict';

/**
 * @ngdoc overview
 * @name wordsRelationGaApp
 * @description
 * # wordsRelationGaApp
 *
 * Main module of the application.
 */
angular
  .module('wordsRelationGaApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/textEntry', {
        templateUrl: 'views/textEntry.html',
        controller: 'textEntryCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
