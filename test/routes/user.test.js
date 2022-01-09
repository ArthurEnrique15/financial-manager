const request = require('supertest');

const app = require('../../src/app');

const mail = `${Date.now()}@mail.com`;

describe('users tests', () => {
  it('should list all users', () => {
    return request(app).get('/users')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
      });
  });

  it('should post a user', () => {
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

  // using promise.then
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

  // using async/await
  it('should not post a user without a mail', async () => {
    const result = await request(app).post('/users')
      .send({
        name: 'Arthur Enrique',
        password: 'password',
      });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Email is required');
  });

  it('should not post a user without a password', () => {
    return request(app).post('/users')
      .send({
        name: 'Arthur Enrique',
        mail,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Password is required');
      });
  });

  it('should not post a user with an existing email', () => {
    return request(app).post('/users')
      .send({
        name: 'Arthur Enrique',
        mail,
        password: 'password',
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Email already exists');
      });
  });
});
