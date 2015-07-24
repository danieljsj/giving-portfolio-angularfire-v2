'use strict';

/**
 * @ngdoc function
 * @name angularfire2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularfire2App
 */
angular.module('angularfire2App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
