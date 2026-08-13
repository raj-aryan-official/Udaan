const request = require('supertest');
const app = require('../src/app');

describe('Teacher Endpoints', () => {
  let teacherToken;
  let studentToken;

  beforeEach(async () => {
    const teacherRes = await request(app).post('/auth/register').send({
      mobileNumber: '9888777666',
      pin: '1234',
      role: 'teacher',
      name: 'Ramesh Sir',
      schoolCode: 'OD_PURI_001',
      assignedGrades: ['3', '4'],
    });
    teacherToken = teacherRes.body.accessToken;

    const studentRes = await request(app).post('/auth/register').send({
      mobileNumber: '9111222444',
      pin: '1234',
      role: 'student',
      name: 'Class 3 Student',
      grade: '3',
      schoolCode: 'OD_PURI_001',
    });
    studentToken = studentRes.body.accessToken;
  });

  describe('GET /teacher/class/:id/progress', () => {
    it('should return class progress for authorized teacher', async () => {
      const res = await request(app)
        .get('/teacher/class/3/progress')
        .set('Authorization', `Bearer ${teacherToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.studentCount).toBeGreaterThan(0);
      expect(res.body.data[0].name).toEqual('Class 3 Student');
    });

    it('should deny access to student user (403 Forbidden)', async () => {
      const res = await request(app)
        .get('/teacher/class/3/progress')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(res.statusCode).toEqual(403);
    });
  });

  describe('POST /teacher/missions', () => {
    it('should allow teacher to assign custom class mission', async () => {
      const res = await request(app)
        .post('/teacher/missions')
        .set('Authorization', `Bearer ${teacherToken}`)
        .send({
          title: 'Special Math Weekend Challenge',
          grade: '3',
          targetCount: 4,
          subject: 'Mathematics',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.mission.title).toEqual('Special Math Weekend Challenge');
    });
  });
});
