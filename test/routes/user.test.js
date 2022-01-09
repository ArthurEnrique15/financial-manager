const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const mail = `${Date.now()}@mail.com`;

let user;

describe('users tests', () => {
  // creates an user to login and call the requests
  beforeAll(async () => {
    user = await app.services.users.create({
      name: 'Arthur Enrique',
      mail: `${Date.now()}@mail.com`,
      password: 'password',
    });

    user.token = jwt.encode(user, 'segredo');
  });

  it('should list all users', () => {
    return request(app).get('/users')
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('should post a user', () => {
    return request(app).post('/users')
      .send({
        name: 'Arthur Enrique',
        mail,
        password: 'password',
      })
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Arthur Enrique');
        expect(res.body.mail).toBe(mail);
        expect(res.body).not.toHaveProperty('password');
      });
  });

  it('should store an encrypted password', async () => {
    const res = await request(app).post('/users')
      .send({
        name: 'Arthur Enrique',
        mail: `${Date.now()}@mail.com`,
        password: 'password',
      })
      .set('authorization', `bearer ${user.token}`);

    expect(res.status).toBe(201);

    const { id } = res.body;

    const userDB = await app.services.users.findOne({ id });

    expect(userDB.password).not.toBe('password');
  });

  // using promise.then
  it('should not post a nameless user', () => {
    return request(app).post('/users')
      .send({
        mail: 'example@example.com',
        password: 'password',
      })
      .set('authorization', `bearer ${user.token}`)
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
      })
      .set('authorization', `bearer ${user.token}`);

    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Email is required');
  });

  it('should not post a user without a password', () => {
    return request(app).post('/users')
      .send({
        name: 'Arthur Enrique',
        mail,
      })
      .set('authorization', `bearer ${user.token}`)
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
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Email already exists');
      });
  });
});
