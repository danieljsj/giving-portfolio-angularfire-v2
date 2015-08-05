'use strict';

/**
 * @ngdoc service
 * @name angularfire2App.budget
 * @description
 * # budget
 * Service in the angularfire2App.
 */
angular.module('angularfire2App')
  .service('Budget', ['Ref', '$firebaseObject', function (Ref, $firebaseObject) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var Budget = $firebaseObject.$extend({

    	// PROBLEM!/CODE BUG: firebase objects immediately shed all methods when added. instead of adding methods directly, we must use fb's $extend, which sets your methods-containing object as a protoype. however, the templating engine (/$scope?) appears not to see this prototype, nor does my angular inspector chrome extension. so I'll need to figure out how to actually get at those methods...

	  	yearly: function(){ // not sure whether storing things with funcs in firebase will break things.

	  		switch ( this.givingBasis ) { // note: angular template is trying to read stuff before it even comes in... how do we prevent this?
				
				case 'fixed':
					switch ( this.fixedGivingTimeframe ) {
						case 'yearly':
							return this.fixedGivingAmount;
						case 'monthly':
							return this.fixedGivingAmount * 12;
					}
	  			
	  			case 'income':
					switch ( this.incomeTimeframe ) {
						case 'yearly':
							var yearlyIncome = this.incomeAmount;
							break;
						case 'monthly':
							var yearlyIncome = this.incomeAmount * 12;
							break;
						throw 'error: income timeframe not specified';
					}
					switch ( this.incomeBeforeOrAfterTaxes ) {
						case 'before':
							var yearlyGiveableIncome = yearlyIncome;
							break;
						case 'after':
							var yearlyGiveableIncome = yearlyIncome * (1-this.incomeTaxPercentage/100);
							break;
						throw 'error: before or after taxes must be specified';
					}
					return yearlyGiveableIncome * this.incomeGivingPercentage/100;
				
				throw 'error: giving basis not specified';
	  		}
	  	},


	  	monthly: function(){
	  		return this.yearly() / 12;
	  	}


    });


  	return function(userId) {

  		// not using userId yet, but may eventually, so i'm setting this up per the guide to extending services: https://www.firebase.com/docs/web/libraries/angular/guide/extending-services.html
  		
  		var ref = Ref.child('budget');

  		console.log(Budget);

  		return new Budget(ref);

  	} ;

}]);