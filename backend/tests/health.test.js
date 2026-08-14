const request = require('supertest');
const app = require('../src/app');

describe('Health Check Endpoint', () => {
  it('GET /health should return 200 OK and status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('service', 'udaan-backend');
  });
});
