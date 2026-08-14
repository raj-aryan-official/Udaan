const request = require('supertest');
const app = require('../src/app');
const Content = require('../src/models/Content');
const { sampleContent } = require('../src/scripts/seed');

describe('Content Endpoints', () => {
  beforeEach(async () => {
    await Content.insertMany(sampleContent);
  });

  describe('GET /content', () => {
    it('should return content filtered by gradeBand', async () => {
      const res = await request(app).get('/content?gradeBand=nursery_1');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].gradeBand).toEqual('nursery_1');
    });

    it('should filter content by subject', async () => {
      const res = await request(app).get('/content?subject=Mathematics');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.every((item) => item.subject === 'Mathematics')).toBe(true);
    });
  });

  describe('GET /content/:id', () => {
    it('should fetch single content item by ID', async () => {
      const item = await Content.findOne({ gradeBand: 'class_2_4' });
      const res = await request(app).get(`/content/${item._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toEqual(item.title);
    });

    it('should return 404 for non-existent content ID', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app).get(`/content/${fakeId}`);

      expect(res.statusCode).toEqual(404);
    });
  });
});
