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
    // $scope.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
    	
    budget.settings.$bindTo($scope,'bs'); // budget settings
    $scope.budget = budget; // budget funcs

    var defaults = {
    	currency: 'usd'
    }

    for ( var key in defaults ){ // not working; why?
    	if ( ! budget.hasOwnProperty(key) ){
    		budget[key] = defaults[key];
    	}
    }

  }]);



  // gpFinance (calc funcs)

  // budget

  // pick a primary. yearly or monthly.