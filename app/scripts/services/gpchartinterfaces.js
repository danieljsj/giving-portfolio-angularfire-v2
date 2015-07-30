'use strict';

/**
 * @ngdoc service
 * @name angularfire2App.gpChartInterfaces
 * @description
 * # gpChartInterfaces
 * Service in the angularfire2App.
 */
angular.module('angularfire2App')
  .service('gpChartInterfaces', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    

    this.FlatChart = {
		Info: function (points, idSelector, valueSelector, nameSelector ){ // perhaps rather than just saving 3 things, this should accept a single object, throw error if it lacks the things, but be okay with extra things, like a php interface.
			this.points = /*clone(*/points/*)*/; // NOTE: I'm not sure I need to clone this! why? because I can make the "copying" happen within gpHighcharts
			this.idSelector = /*clone(*/idSelector/*)*/;
			this.valueSelector = /*clone(*/valueSelector/*)*/;
			this.nameSelector = /*clone(*/nameSelector/*)*/;
		}
	};
    
  //   this.CategorizedChart = {
		// Info: function (points, idSelector, valueSelector, categorySelector ){ // perhaps rather than just saving 3 things, this should accept a single object, throw error if it lacks the things, but be okay with extra things, like a php interface.
		// 	this.points = clone(points);
		// 	this.idSelector = clone(idSelector);
		// 	this.valueSelector = clone(valueSelector);
		// 	this.categorySelector = clone(categorySelector);
		// }
  //   };







	// this.Controls: {
    	// 	... something like refresh, selectnext, or something... but not sure we will need that.
    	// 	also maybe the controls should go inside the Charts (even if they're the same...)
    	// 	also also... i have a premonition that there won't be a cute animation in changing the category of an item...
    	// }

  	function clone(obj) {
	    // Handle the 3 simple types, and null or undefined
	    if (null == obj || "object" != typeof obj) return obj;

	    // Handle Date
	    if (obj instanceof Date) {
	        var copy = new Date();
	        copy.setTime(obj.getTime());
	        return copy;
	    }

	    // Handle Array
	    if (obj instanceof Array) {
	        var copy = [];
	        for (var i = 0, len = obj.length; i < len; i++) {
	            copy[i] = clone(obj[i]);
	        }
	        return copy;
	    }

	    // Handle Object
	    if (obj instanceof Object) {
	        var copy = {};
	        for (var attr in obj) {
	            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
	        }
	        return copy;
	    }

	    throw new Error("Unable to copy obj! Its type isn't supported.");
	}
  });