const request = require('supertest');
const app = require('../src/app');
const Content = require('../src/models/Content');
const Badge = require('../src/models/Badge');
const { sampleContent, sampleBadges } = require('../src/scripts/seed');

describe('Gamification Engine & Endpoints', () => {
  beforeEach(async () => {
    await Content.insertMany(sampleContent);
    await Badge.insertMany(sampleBadges);
  });

  describe('Nursery 1 Grade Band Rewards', () => {
    it('should award stars, disable coins/xp, and trigger plant growth & celebration', async () => {
      const regRes = await request(app).post('/auth/register').send({
        mobileNumber: '9111111111',
        pin: '1234',
        role: 'student',
        name: 'Little Pinku',
        grade: 'Nursery',
      });
      const token = regRes.body.accessToken;

      const nurseryContent = await Content.findOne({ gradeBand: 'nursery_1' });

      const res = await request(app)
        .post(`/activities/${nurseryContent._id}/complete`)
        .set('Authorization', `Bearer ${token}`)
        .send({ score: 100 });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.rewardsGranted.stars).toBeGreaterThan(0);
      expect(res.body.rewardsGranted.coins).toEqual(0);
      expect(res.body.rewardsGranted.xp).toEqual(0);
      expect(res.body.celebration.trigger).toBe(true);
    });
  });

  describe('Class 2-4 Grade Band Rewards & Streaks', () => {
    it('should award stars and coins, update streak, and award star_starter badge', async () => {
      const regRes = await request(app).post('/auth/register').send({
        mobileNumber: '9222222222',
        pin: '1234',
        role: 'student',
        name: 'Gitanjali Mohanty',
        grade: 'Class 3',
      });
      const token = regRes.body.accessToken;

      const contentItem = await Content.findOne({ gradeBand: 'class_2_4' });

      const res = await request(app)
        .post(`/activities/${contentItem._id}/complete`)
        .set('Authorization', `Bearer ${token}`)
        .send({ score: 100 });

      expect(res.statusCode).toEqual(200);
      expect(res.body.rewardsGranted.stars).toBeGreaterThan(0);
      expect(res.body.rewardsGranted.coins).toBeGreaterThan(0);
      expect(res.body.profile.streak.current).toEqual(1);
    });
  });

  describe('Class 5-8 Grade Band Level Ups', () => {
    it('should award XP and coins, and trigger level up when crossing XP threshold', async () => {
      const regRes = await request(app).post('/auth/register').send({
        mobileNumber: '9333333333',
        pin: '1234',
        role: 'student',
        name: 'Debasis Sahoo',
        grade: 'Class 6',
      });
      const token = regRes.body.accessToken;

      const contentItem = await Content.findOne({ gradeBand: 'class_5_8' });

      // Complete 2 activities to gain enough XP to level up
      await request(app)
        .post(`/activities/${contentItem._id}/complete`)
        .set('Authorization', `Bearer ${token}`)
        .send({ score: 100 });

      const res = await request(app)
        .post(`/activities/${contentItem._id}/complete`)
        .set('Authorization', `Bearer ${token}`)
        .send({ score: 100 });

      expect(res.statusCode).toEqual(200);
      expect(res.body.rewardsGranted.xp).toBeGreaterThan(0);
      expect(res.body.profile.xp).toBeGreaterThanOrEqual(100);
      expect(res.body.profile.level).toBeGreaterThan(1);
    });
  });

  describe('GET /gamification/me & GET /badges', () => {
    it('should retrieve gamification profile and badge catalog', async () => {
      const regRes = await request(app).post('/auth/register').send({
        mobileNumber: '9444444444',
        pin: '1234',
        role: 'student',
        name: 'Manoj Panda',
        grade: 'Class 4',
      });
      expect(regRes.statusCode).toEqual(201);
      const token = regRes.body.accessToken;

      const profileRes = await request(app)
        .get('/gamification/me')
        .set('Authorization', `Bearer ${token}`);
      expect(profileRes.statusCode).toEqual(200);
      expect(profileRes.body.data.gradeBand).toEqual('class_2_4');

      const badgesRes = await request(app).get('/badges');
      expect(badgesRes.statusCode).toEqual(200);
      expect(badgesRes.body.data.length).toBeGreaterThan(0);
    });
  });
});
