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
    	
    budget.settings.$bindTo($scope,'b');

    var defaults = {
    	currency: 'usd'
    }

    for ( var key in defaults ){
    	if ( ! budget.hasOwnProperty(key) ){
    		budget[key] = defaults[key];
    	}
    }

	// coming soon! 
    // $scope.getAnnualGiving(){
    // 	if ( 'income' == $scope.opt.giving.basis ){
    // 		if ( 'yearly' == $scope.opt.giving ){

    // 		}
    // 	}
    // }

  }]);



  // gpFinance (calc funcs)

  // budget

  // pick a primary. yearly or monthly.