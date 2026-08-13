const request = require('supertest');
const app = require('../src/app');
const Mission = require('../src/models/Mission');
const { sampleMissions } = require('../src/scripts/seed');

describe('Missions Endpoints', () => {
  beforeEach(async () => {
    await Mission.insertMany(sampleMissions);
  });

  it('GET /missions/active should return active missions for student grade band', async () => {
    const regRes = await request(app).post('/auth/register').send({
      mobileNumber: '9555555555',
      pin: '1234',
      role: 'student',
      name: 'Rinku Behera',
      grade: 'Class 3',
    });
    const token = regRes.body.accessToken;

    const res = await request(app)
      .get('/missions/active')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].gradeBand).toEqual('class_2_4');
    expect(res.body.data[0]).toHaveProperty('userProgress');
  });
});
