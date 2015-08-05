'use strict';

/**
 * @ngdoc function
 * @name angularfire2App.controller:GivingbudgetCtrl
 * @description
 * # GivingbudgetCtrl
 * Controller of the angularfire2App
 */
angular.module('angularfire2App')
  .controller('GivingbudgetCtrl', ['Ref','$scope','Budget',function (Ref, $scope, Budget) {
    // $scope.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
    
    var budget = new Budget();

    // debug:
    budget.yearly = function(){return 42;}
    budget.monthly = function(){return 42;}
    console.log(budget); // has no methods.

    var foo = {};
    foo.bar = function(){return 'bar';}
    console.log(foo); // has bar method.


    budget.$bindTo($scope,'b'); // budget settings

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