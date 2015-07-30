'use strict';

describe('Service: gpObjectUtils', function () {

  // load the service's module
  beforeEach(module('angularfire2App'));

  // instantiate service
  var gpObjectUtils;
  beforeEach(inject(function (_gpObjectUtils_) {
    gpObjectUtils = _gpObjectUtils_;
  }));

  it('should do something', function () {
    expect(!!gpObjectUtils).toBe(true);
  });

});
