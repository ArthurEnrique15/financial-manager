const request = require('supertest');
const app = require('../../src/app');

const mainRoute = '/accounts';

let user;

describe('accounts tests', () => {
  // creates an user before the accounts tests
  beforeAll(async () => {
    const result = await app.services.users.create({
      name: 'Arthur Enrique',
      mail: `${Date.now()}@mail.com`,
      password: 'password',
    });

    user = result.data;
  });

  it('should post an account', async () => {
    const result = await request(app).post(mainRoute)
      .send({
        name: 'test account',
        user_id: user.id,
      });

    expect(result.status).toBe(201);
    expect(result.body.data.name).toBe('test account');
  });
});
