'use strict';

describe('Service: givingBudgetSettings', function () {

  // load the service's module
  beforeEach(module('angularfire2App'));

  // instantiate service
  var givingBudgetSettings;
  beforeEach(inject(function (_givingBudgetSettings_) {
    givingBudgetSettings = _givingBudgetSettings_;
  }));

  it('should do something', function () {
    expect(!!givingBudgetSettings).toBe(true);
  });

});
