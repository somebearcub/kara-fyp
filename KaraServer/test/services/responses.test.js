const assert = require('assert');
const app = require('../../src/app');

describe('\'responses\' service', () => {
  it('registered the service', () => {
    const service = app.service('responses');

    assert.ok(service, 'Registered the service');
  });
});
