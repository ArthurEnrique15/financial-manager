const request = require('supertest');

const app = require('../../src/app');

describe('auth tests', () => {
  it('should receive a token when logging in', async () => {
    const user = await app.services.users.create({
      name: 'Arthur Enrique',
      mail: `${Date.now()}@mail.com`,
      password: 'password',
    });

    const res = await request(app).post('/auth/signin')
      .send({
        mail: user.mail,
        password: 'password',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not auth a user with a wrong password', async () => {
    const user = await app.services.users.create({
      name: 'Arthur Enrique',
      mail: `${Date.now()}@mail.com`,
      password: 'password',
    });

    const res = await request(app).post('/auth/signin')
      .send({
        mail: user.mail,
        password: 'wrong_password',
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid mail or password');
  });

  it('should not auth a user that does not exist', async () => {
    const res = await request(app).post('/auth/signin')
      .send({
        mail: 'non_existing_mail@example.com',
        password: 'password',
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid mail or password');
  });
});
