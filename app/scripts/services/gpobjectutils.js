'use strict';

/**
 * @ngdoc service
 * @name angularfire2App.gpObjectUtils
 * @description
 * # gpObjectUtils
 * Service in the angularfire2App.
 */
angular.module('angularfire2App')
  .service('gpObjectUtils', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.fetchFromObject = function (selector, obj) {

		// null case
	    if ( typeof obj === 'undefined' ) {
	        return false;
	    }

	    // dot-notation case
	    var _index = selector.indexOf('.')
	    if(_index > -1) {
	    	var deeperObj = obj[selector.substring(0, _index)];
	    	var newSelector = selector.substr(_index + 1);
	        return fetchFromObject(deeperObj, newSelector);
	    }
	    
	    // string case (must appear after dot-notation case, which triggers the recursion!)
		if ( typeof selector === 'string' ) {
	        return obj[selector];
	    }

	    // array case
	    if ( typeof selector === 'array' ) {
	    	if ( selector.length === 1 ) {
	    		return obj[selector[0]];
	    	}
	    	else {
	    		deeperObj = obj[selector[0]];
	    		selector.splice(0,1);
	    		newSelector = selector;
	    		return fetchFromObject( deeperObj, newSelector );
	    	}
	    }
	}

  });
