const { test, expect } = require('../fixtures/test');
const bff = process.env.BFF_URL || 'http://localhost:8090';

test.describe('Protected claims API', () => {
  test('SEC-01: anonymous requests cannot read claims', async ({ request }) => {
    const response = await request.get(`${bff}/api/claims`, { maxRedirects: 0 });
    expect([401, 403]).toContain(response.status());
  });

  test('SEC-02: anonymous requests cannot access admin claims', async ({ request }) => {
    const response = await request.get(`${bff}/api/admin/claims`, { maxRedirects: 0 });
    expect([401, 403]).toContain(response.status());
  });
});
