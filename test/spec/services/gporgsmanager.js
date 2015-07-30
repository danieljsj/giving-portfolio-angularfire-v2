'use strict';

describe('Service: gpOrgsManager', function () {

  // load the service's module
  beforeEach(module('angularfire2App'));

  // instantiate service
  var gpOrgsManager;
  beforeEach(inject(function (_gpOrgsManager_) {
    gpOrgsManager = _gpOrgsManager_;
  }));

  it('should do something', function () {
    expect(!!gpOrgsManager).toBe(true);
  });

});
