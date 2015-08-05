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
   
    console.log(budget);

    if( budget.hasOwnProperty('currency') ) { init(); } else { budget.$loaded(init); }



    function init(){

      applyDefaults();
      
      // budget.$bindTo($scope, 'b');

      $scope.b = budget;

      // $scope.$watch(
      //   'b',
      //   function(newVal,oldVal){
      //     console.log(newVal);
      //   },
      //   true
      // )
      // Error: [$rootScope:infdig] 10 $digest() iterations reached. Aborting!

      // var query = $('.container input, .container .btn'); 
      // console.log(query);
      // query.on('click change', tmpSaveBudget );
      // PROBLEM: this query is only getting the stuff that was already loaded. looks like anything inside ng-if is really not-loading-until-satisfied, not just hiding then un-hiding.

    }

    function applyDefaults(){
      
      var defaults = {
        currency: 'usd'
      }
      
      angular.extend(budget,defaults);

    }

  }]);