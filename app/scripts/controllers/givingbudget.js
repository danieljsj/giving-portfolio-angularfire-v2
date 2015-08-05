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
    
    var budgetPromise = new Budget();

    budgetPromise.$loaded(function(budget){

      console.log(budget);
     
      $scope.b = budget;

      window.scope = $scope;

      // $scope.$watch( 
      //   'b',
      //   function(newValue,oldValue){
      //     // console.log($scope.b);
      //     // $scope.b.$save(); // even loops without this...
      //   },
      //   true
      // );
      // // issue: this is saving only the first time, only when 


      var defaults = {
      	currency: 'usd'
      }

      for ( var key in defaults ){ // not working; why?
      	if ( ! budget.hasOwnProperty(key) ){
      		budget[key] = defaults[key];
      	}
      }
    })


  }]);



  // gpFinance (calc funcs)

  // budget

  // pick a primary. yearly or monthly.