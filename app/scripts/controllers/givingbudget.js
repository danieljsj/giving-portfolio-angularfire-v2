'use strict';

/**
 * @ngdoc function
 * @name angularfire2App.controller:GivingbudgetCtrl
 * @description
 * # GivingbudgetCtrl
 * Controller of the angularfire2App
 */
angular.module('angularfire2App')
  .controller('GivingbudgetCtrl', ['Ref','$scope','givingBudgetSettings',function (Ref, $scope, givingBudgetSettings) {
    // $scope.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
    
    var options = givingBudgetSettings.settings;
	
    options.$bindTo($scope,'opt');

    var defaults = {
    	currency: 'usd'
    }

    for ( var key in defaults ){
    	if ( ! options.hasOwnProperty(key) ){
    		options[key] = defaults[key];
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

  // givingBudgetSettings

  // pick a primary. yearly or monthly.