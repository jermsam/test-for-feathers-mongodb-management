const assert = require('assert');
const app = require('../../src/app');

describe('\'looking\' service', () => {
  it('registered the service', () => {
    const service = app.service('looking');

    assert.ok(service, 'Registered the service');
  });
});
