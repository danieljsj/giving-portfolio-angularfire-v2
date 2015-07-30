'use strict';

describe('Service: gpChartInterfaces', function () {

  // load the service's module
  beforeEach(module('angularfire2App'));

  // instantiate service
  var gpChartInterfaces;
  beforeEach(inject(function (_gpChartInterfaces_) {
    gpChartInterfaces = _gpChartInterfaces_;
  }));

  it('should do something', function () {
    expect(!!gpChartInterfaces).toBe(true);
  });

});
