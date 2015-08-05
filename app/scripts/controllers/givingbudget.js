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
    console.log(budget); // has no immediate methods, has methods in prototype.
    // alert(budget.yearly()); // prototype works from normal function call (despite not getting called from templates, using parse)

    $scope.yearly = budget.yearly;

    var foo = {};
    foo.bar = function(){return 'bar';}
    console.log(foo); // has bar method.


    budget.$bindTo($scope,'b'); 
    // I THINK I've GOT ITbindTo only brings in the data, not the methods! 
    // INDEED!: https://github.com/firebase/angularfire/issues/380 <=fix is there; just add object to scope, then set up a $watch on it. It's kinda weird though... couldn't their bindTo

    console.log($scope); // shows property 'b:'
    console.log($scope.b); // undefined. INTERESTING! WTDEUCE? (note: 'b' was added by $bindTo)
    // $scope[b].yearly = budget.yearly; // breaks; can't set property of undefined
    

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