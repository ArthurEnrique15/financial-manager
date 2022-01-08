const request = require('supertest');

const app = require('../src/app');

describe('app tests', () => {
  it('should answer in root', () => {
    return request(app).get('/').then((res) => {
      expect(res.status).toBe(200);
    });
  });
});
