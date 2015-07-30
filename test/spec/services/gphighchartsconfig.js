'use strict';

describe('Service: gpHighchartsConfig', function () {

  // load the service's module
  beforeEach(module('angularfire2App'));

  // instantiate service
  var gpHighchartsConfig;
  beforeEach(inject(function (_gpHighchartsConfig_) {
    gpHighchartsConfig = _gpHighchartsConfig_;
  }));

  it('should do something', function () {
    expect(!!gpHighchartsConfig).toBe(true);
  });

});
