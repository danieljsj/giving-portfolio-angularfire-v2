'use strict';

describe('Service: gpHighcharts', function () {

  // load the service's module
  beforeEach(module('angularfire2App'));

  // instantiate service
  var gpHighcharts;
  beforeEach(inject(function (_gpHighcharts_) {
    gpHighcharts = _gpHighcharts_;
  }));

  it('should do something', function () {
    expect(!!gpHighcharts).toBe(true);
  });

});
