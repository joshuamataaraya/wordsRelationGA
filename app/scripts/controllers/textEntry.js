'use strict';

/**
 * @ngdoc function
 * @name wordsRelationGaApp.controller:AboutCtrl
 * @description
 * # textEntry
 * Controller of the wordsRelationGaApp
 */
angular.module('wordsRelationGaApp')
  .controller('textEntryCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.insertFromText=function(){
    	alert("Hola mundo")
    }
  });