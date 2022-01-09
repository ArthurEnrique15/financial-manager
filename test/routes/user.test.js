const request = require('supertest');

const app = require('../../src/app');

describe('users tests', () => {
  it('should list all users', () => {
    return request(app).get('/users')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('should post a user', () => {
    const mail = `${Date.now()}@mail.com`;
    return request(app).post('/users')
      .send({
        name: 'Arthur Enrique',
        mail,
        password: 'password',
      })
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.data.name).toBe('Arthur Enrique');
        expect(res.body.data.mail).toBe(mail);
      });
  });

  it('should not post a nameless user', () => {
    return request(app).post('/users')
      .send({
        mail: 'example@example.com',
        password: 'password',
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Name is required');
      });
  });
});
