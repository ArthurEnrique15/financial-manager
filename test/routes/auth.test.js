const request = require('supertest');

const app = require('../../src/app');

describe('auth tests', () => {
  it('should create a user via signup', async () => {
    const res = await request(app).post('/auth/signup')
      .send({
        name: 'Arthur Enrique',
        mail: `${Date.now()}@mail.com`,
        password: 'password',
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Arthur Enrique');
    expect(res.body).toHaveProperty('mail');
    expect(res.body).not.toHaveProperty('password');
  });

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

  it('should not access a protected route without a token', async () => {
    const res = await request(app).get('/v1/users').send();

    expect(res.status).toBe(401);
  });
});
