const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const GamificationProfile = require('../src/models/GamificationProfile');

describe('Auth Endpoints', () => {
  describe('POST /auth/register', () => {
    it('should register a new student and create a GamificationProfile', async () => {
      const res = await request(app).post('/auth/register').send({
        mobileNumber: '9876543210',
        pin: '1234',
        role: 'student',
        name: 'Raju Dash',
        grade: 'Class 3',
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('refreshToken');
      expect(res.body.user.role).toEqual('student');
      expect(res.body.user.gradeBand).toEqual('class_2_4');

      const user = await User.findOne({ mobileNumber: '9876543210' }).select('+pinHash');
      expect(user).not.toBeNull();
      expect(user.pinHash).toBeDefined();

      const profile = await GamificationProfile.findOne({ userId: user._id });
      expect(profile).not.toBeNull();
      expect(profile.gradeBand).toEqual('class_2_4');
    });

    it('should register a teacher with school code', async () => {
      const res = await request(app).post('/auth/register').send({
        mobileNumber: '9998887770',
        pin: '4321',
        role: 'teacher',
        name: 'Sushree Madam',
        schoolCode: 'OD_PURI_001',
        assignedGrades: ['3', '4', '5'],
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body.user.role).toEqual('teacher');
      expect(res.body.user.schoolCode).toEqual('OD_PURI_001');
    });

    it('should fail if mobile number is invalid or duplicate', async () => {
      await request(app).post('/auth/register').send({
        mobileNumber: '9876543210',
        pin: '1234',
        role: 'student',
        name: 'Raju Dash',
        grade: '3',
      });

      const res = await request(app).post('/auth/register').send({
        mobileNumber: '9876543210',
        pin: '1234',
        role: 'student',
        name: 'Duplicate Student',
        grade: '3',
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toContain('already registered');
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await request(app).post('/auth/register').send({
        mobileNumber: '9123456789',
        pin: '9999',
        role: 'student',
        name: 'Priya Nayak',
        grade: 'Nursery',
      });
    });

    it('should login successfully with valid PIN', async () => {
      const res = await request(app).post('/auth/login').send({
        mobileNumber: '9123456789',
        pin: '9999',
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body.user.gradeBand).toEqual('nursery_1');
    });

    it('should reject login with wrong PIN', async () => {
      const res = await request(app).post('/auth/login').send({
        mobileNumber: '9123456789',
        pin: '0000',
      });

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /auth/guest', () => {
    it('should create an ephemeral guest session with 48h expiration', async () => {
      const res = await request(app).post('/auth/guest').send({
        grade: '1',
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.user.isGuest).toBe(true);
      expect(res.body.user.gradeBand).toEqual('nursery_1');
      expect(res.body.user.expiresAt).toBeDefined();

      const profile = await GamificationProfile.findOne({ userId: res.body.user.id });
      expect(profile).not.toBeNull();
    });
  });

  describe('POST /auth/refresh', () => {
    it('should issue a new access token given a valid refresh token', async () => {
      const regRes = await request(app).post('/auth/guest').send({});
      const refreshToken = regRes.body.refreshToken;

      const refreshRes = await request(app).post('/auth/refresh').send({ refreshToken });
      expect(refreshRes.statusCode).toEqual(200);
      expect(refreshRes.body).toHaveProperty('accessToken');
    });
  });

  describe('PIN Reset Flow', () => {
    it('should request OTP and allow resetting PIN', async () => {
      await request(app).post('/auth/register').send({
        mobileNumber: '9888877776',
        pin: '1111',
        role: 'student',
        name: 'Babu Jena',
        grade: '5',
      });

      const reqOtpRes = await request(app).post('/auth/pin-reset/request-otp').send({
        mobileNumber: '9888877776',
      });
      expect(reqOtpRes.statusCode).toEqual(200);

      const resetRes = await request(app).post('/auth/pin-reset/verify').send({
        mobileNumber: '9888877776',
        otp: '1234',
        newPin: '5555',
      });
      expect(resetRes.statusCode).toEqual(200);

      const loginRes = await request(app).post('/auth/login').send({
        mobileNumber: '9888877776',
        pin: '5555',
      });
      expect(loginRes.statusCode).toEqual(200);
    });
  });

  describe('POST /auth/convert-guest', () => {
    it('should convert a guest session into a permanent student user preserving profile', async () => {
      const guestRes = await request(app).post('/auth/guest').send({ grade: '2' });
      const token = guestRes.body.accessToken;

      const convertRes = await request(app)
        .post('/auth/convert-guest')
        .set('Authorization', `Bearer ${token}`)
        .send({
          mobileNumber: '9777766665',
          pin: '8888',
          name: 'Converted Student',
          role: 'student',
          grade: '3',
        });

      expect(convertRes.statusCode).toEqual(200);
      expect(convertRes.body.user.isGuest).toBe(false);
      expect(convertRes.body.user.mobileNumber).toEqual('9777766665');

      const dbUser = await User.findById(guestRes.body.user.id);
      expect(dbUser.isGuest).toBe(false);
      expect(dbUser.expiresAt).toBeUndefined();
    });
  });
});
