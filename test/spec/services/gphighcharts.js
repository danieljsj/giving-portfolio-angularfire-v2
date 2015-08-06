'use strict';

describe('Service: givingChart', function () {

  // load the service's module
  beforeEach(module('angularfire2App'));

  // instantiate service
  var givingChart;
  beforeEach(inject(function (_givingChart_) {
    givingChart = _givingChart_;
  }));

  it('should do something', function () {
    expect(!!givingChart).toBe(true);
  });

});
