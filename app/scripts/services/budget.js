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

    var budget = $firebaseObject(Ref.child('budget'));

  	budget.yearly = function(){ // not sure whether storing things with funcs in firebase will break things.


  		switch ( this.giving.basis ) { // note: angular template is trying to read stuff before it even comes in... how do we prevent this?
  			case 'income':
				switch ( this.income.timeframe ) {
					case 'yearly':
						var yearlyIncome = this.income.amount;
						break;
					case 'monthly':
						var yearlyIncome = this.income.amount * 12;
						break;
					throw 'error: income timeframe not specified';
				}
				switch ( this.giving.beforeOrAfterTaxes ) {
					case 'before':
						var yearlyGiveableIncome = yearlyIncome;
						break;
					case 'after':
						var yearlyGiveableIncome = yearlyIncome * (1-this.income.taxPercentage/100);
						break;
					throw 'error: before or after taxes must be specified';
				}
				return yearlyGiveableIncome * this.giving.percentage/100;
			case 'fixed':
				switch ( this.giving.timeframe ) {
					case 'yearly':
						return this.giving.amount;
					case 'monthly':
						return this.giving.amount * 12;
				}
			throw 'error: giving basis not specified';
  		}
  	}

  	budget.monthly = function(){
  		return this.yearly() / 12;
  	}

  	// DEBUGTODO: console.log budget.monthly now and later

  	return budget;

}]);