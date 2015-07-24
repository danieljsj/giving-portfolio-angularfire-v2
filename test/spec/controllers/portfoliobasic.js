'use strict';

describe('Controller: PortfoliobasicCtrl', function () {

  // load the controller's module
  beforeEach(module('angularfire2App'));

  var PortfoliobasicCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PortfoliobasicCtrl = $controller('PortfoliobasicCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
