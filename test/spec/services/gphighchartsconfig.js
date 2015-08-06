'use strict';

describe('Service: givingChartConfig', function () {

  // load the service's module
  beforeEach(module('angularfire2App'));

  // instantiate service
  var givingChartConfig;
  beforeEach(inject(function (_givingChartConfig_) {
    givingChartConfig = _givingChartConfig_;
  }));

  it('should do something', function () {
    expect(!!givingChartConfig).toBe(true);
  });

});
