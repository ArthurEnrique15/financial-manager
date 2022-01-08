const request = require('supertest');

const app = require('../src/app');

describe('users tests', () => {
  it('should list all users', () => {
    return request(app).get('/users')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toHaveProperty('name', 'Arthur Enrique');
      });
  });

  it('should post a user', () => {
    return request(app).post('/users')
      .send({ name: 'Arthur Enrique', email: 'arthur@mail.com' })
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Arthur Enrique');
        expect(res.body.email).toBe('arthur@mail.com');
      });
  });
});
