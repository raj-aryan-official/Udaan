const request = require('supertest');
const app = require('../src/app');
const GamificationProfile = require('../src/models/GamificationProfile');

describe('User Endpoints', () => {
  let token;
  let userId;

  beforeEach(async () => {
    const regRes = await request(app).post('/auth/register').send({
      mobileNumber: '9000000001',
      pin: '1234',
      role: 'student',
      name: 'Initial Name',
      grade: '3',
    });

    token = regRes.body.accessToken;
    userId = regRes.body.user.id;
  });

  describe('GET /users/me', () => {
    it('should retrieve current user profile', async () => {
      const res = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.name).toEqual('Initial Name');
      expect(res.body.user.gradeBand).toEqual('class_2_4');
    });

    it('should fail when no authorization token is provided', async () => {
      const res = await request(app).get('/users/me');
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('PATCH /users/me', () => {
    it('should update name and avatar', async () => {
      const res = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Updated Name',
          avatar: { base: 'avatar_hero', unlocks: ['avatar_hero'] },
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.user.name).toEqual('Updated Name');
      expect(res.body.user.avatar.base).toEqual('avatar_hero');
    });

    it('should update grade and automatically derive new gradeBand in User & GamificationProfile', async () => {
      const res = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${token}`)
        .send({
          grade: '7', // class_5_8
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.user.grade).toEqual('7');
      expect(res.body.user.gradeBand).toEqual('class_5_8');

      const profile = await GamificationProfile.findOne({ userId });
      expect(profile.gradeBand).toEqual('class_5_8');
    });
  });
});
