const request = require('supertest');
const app = require('../src/app');

describe('Certificate Endpoints', () => {
  it('GET /certificates/me should return 403 for Class 6 student', async () => {
    const regRes = await request(app).post('/auth/register').send({
      mobileNumber: '9111222333',
      pin: '1234',
      role: 'student',
      name: 'Mid School Learner',
      grade: 'Class 6',
    });
    const token = regRes.body.accessToken;

    const res = await request(app)
      .get('/certificates/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toContain('Class 9 and Class 10');
  });

  it('GET /certificates/me should return certificates list for Class 10 student', async () => {
    const regRes = await request(app).post('/auth/register').send({
      mobileNumber: '9444555666',
      pin: '1234',
      role: 'student',
      name: 'Board Candidate',
      grade: 'Class 10',
    });
    const token = regRes.body.accessToken;

    const res = await request(app)
      .get('/certificates/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
