'use strict';

describe('Controller: TotalgivingCtrl', function () {

  // load the controller's module
  beforeEach(module('angularfire2App'));

  var TotalgivingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TotalgivingCtrl = $controller('TotalgivingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
