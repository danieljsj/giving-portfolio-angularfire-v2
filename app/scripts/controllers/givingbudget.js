'use strict';

/**
 * @ngdoc function
 * @name angularfire2App.controller:GivingbudgetCtrl
 * @description
 * # GivingbudgetCtrl
 * Controller of the angularfire2App
 */
angular.module('angularfire2App')
  .controller('GivingbudgetCtrl', ['Ref','$scope','budget',function (Ref, $scope, budget) {
   

    var b = budget.fbObj

    if( b.hasOwnProperty('currency') ) { init(); } else { b.$loaded(init); }



    function init(){

      applyDefaults();
      
      b.$bindTo($scope, 'b');

      $scope.budget = budget;

    }



    function applyDefaults(){
      
      var defaults = {
        currency: 'usd'
      }
      
      angular.extend(b,defaults);

    }

  }]);