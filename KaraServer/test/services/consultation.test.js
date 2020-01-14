const assert = require('assert');
const app = require('../../src/app');

describe('\'consultation\' service', () => {
  it('registered the service', () => {
    const service = app.service('consultation');

    assert.ok(service, 'Registered the service');
  });
});
