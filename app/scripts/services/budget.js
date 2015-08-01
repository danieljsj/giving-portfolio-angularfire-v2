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

}]);