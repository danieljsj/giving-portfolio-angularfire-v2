'use strict';

/**
 * @ngdoc service
 * @name angularfire2App.budget
 * @description
 * # budget
 * Service in the angularfire2App.
 */
angular.module('angularfire2App')
  .service('budget', ['Ref', '$firebaseObject', function (Ref, $firebaseObject) {
    // AngularJS will instantiate a singleton by calling "new" on this function

  	this.settings = $firebaseObject(Ref.child('budget'));


  	this.yearly = function(){

  		var s = this.settings;

  		console.log(s);

  		switch ( s.giving.basis ) { // note: angular template is trying to read stuff before it even comes in... how do we prevent this?
  			case 'income':
				switch ( s.income.timeframe ) {
					case 'yearly':
						var yearlyIncome = s.income.amount;
						break;
					case 'monthly':
						var yearlyIncome = s.income.amount * 12;
						break;
					throw 'error: income timeframe not specified';
				}
				switch ( s.giving.beforeOrAfterTaxes ) {
					case 'before':
						var yearlyGiveableIncome = yearlyIncome;
						break;
					case 'after':
						var yearlyGiveableIncome = yearlyIncome * (1-s.income.taxPercentage/100);
						break;
					throw 'error: before or after taxes must be specified';
				}
				return yearlyGiveableIncome * s.giving.percentage/100;
			case 'fixed':
				switch ( s.giving.timeframe ) {
					case 'yearly':
						return s.giving.amount;
					case 'monthly':
						return s.giving.amount * 12;
				}
			throw 'error: giving basis not specified';
  		}
  	}

  	this.monthly = function(){
  		return this.yearly() / 12;
  	}

    // $scope.getAnnualGiving(){
    // 	if ( 'income' == $scope.opt.giving.basis ){
    // 		if ( 'yearly' == $scope.opt.giving ){

    // 		}
    // 	}
    // }


}]);