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
    $scope.analizeText=function(){
      var text=document.getElementById("textArea").value;
      var phrase=document.getElementById("phrase").value;
      if(text.length!=0 && phrase.length!=0){
        var analize=new Analizer(text,phrase);
        var ArrayOfWordsToAnalize=analize.selectZoneToAnalize();
        var ArrayOfAllTheText=analize.getTextArray();
        var ProblemA=new Problem(ArrayOfWordsToAnalize,ArrayOfAllTheText);
        var words = ProblemA.getTopTen();
        var threeJS = new ThreeJS(words);
        threeJS.start3D();
        
        //here has to be the reference to the 3D draw page
      }
      else{
        alert("Please fill up all the spaces")
      }
    }

  });