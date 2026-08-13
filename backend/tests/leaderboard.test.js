const request = require('supertest');
const app = require('../src/app');

describe('Leaderboard Endpoints', () => {
  it('GET /leaderboard should return 403 for Class 3 student (class_2_4)', async () => {
    const regRes = await request(app).post('/auth/register').send({
      mobileNumber: '9666666666',
      pin: '1234',
      role: 'student',
      name: 'Young Learner',
      grade: 'Class 3',
    });
    const token = regRes.body.accessToken;

    const res = await request(app)
      .get('/leaderboard')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toContain('Class 5 and above');
  });

  it('GET /leaderboard should return class rankings for Class 6 student (class_5_8)', async () => {
    const regRes = await request(app).post('/auth/register').send({
      mobileNumber: '9777777777',
      pin: '1234',
      role: 'student',
      name: 'Class 6 Scholar',
      grade: 'Class 6',
      schoolCode: 'OD_CUTTACK_002',
    });
    const token = regRes.body.accessToken;

    const res = await request(app)
      .get('/leaderboard?scope=class')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
