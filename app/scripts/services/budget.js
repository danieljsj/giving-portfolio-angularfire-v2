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


	var Budget = $firebaseObject.$extend({
	  
	  	yearly: function(){ // not sure whether storing things with funcs in firebase will break things.

	  		switch ( o.givingBasis ) { // note: angular template is trying to read stuff before it even comes in... how do we prevent this?
				
				case 'fixed':
					switch ( o.fixedGivingTimeframe ) {
						case 'yearly':
							return o.fixedGivingAmount;
						case 'monthly':
							return o.fixedGivingAmount * 12;
					}
	  			
	  			case 'income':
					switch ( o.incomeTimeframe ) {
						case 'yearly':
							var yearlyIncome = o.incomeAmount;
							break;
						case 'monthly':
							var yearlyIncome = o.incomeAmount * 12;
							break;
						throw 'error: income timeframe not specified';
					}
					switch ( o.incomeBeforeOrAfterTaxes ) {
						case 'before':
							var yearlyGiveableIncome = yearlyIncome;
							break;
						case 'after':
							var yearlyGiveableIncome = yearlyIncome * (1-o.incomeTaxPercentage/100);
							break;
						throw 'error: before or after taxes must be specified';
					}
					return yearlyGiveableIncome * o.incomeGivingPercentage/100;
				
				throw 'error: giving basis not specified';
	  		}
	  	},

	  	monthly: function(){
	  		return this.yearly() / 12;
	  	},

	  	delayedSave: function(e){
	  		console.log(e);
	  		console.log(this);
	  		var el = $(e.target); 
	  		console.log(el);
	  		$(e.target).dblclick();
	  		// setTimeout(this.$save,0); // "this" seems to work, but "self" does not. cuz we're out of scope now. hmm.
	  	}

	});

	console.log(Budget);
	
	var budget = new Budget(Ref.child('budget'));

	console.log(budget);

	return budget; // returning an actual budget, not a budget generator. So service should still be 'budget' not 'Budget'.

}]);