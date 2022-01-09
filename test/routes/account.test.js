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

  it('should list all accounts', async () => {
    await app.db('accounts')
      .insert({
        name: 'account list',
        user_id: user.id,
      });

    const result = await request(app).get(mainRoute).send();

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBeGreaterThan(0);
  });

  it('should get an account by id', async () => {
    const accounts = await app.db('accounts')
      .insert({
        name: 'account',
        user_id: user.id,
      }, '*');

    const result = await request(app).get(`${mainRoute}/${accounts[0].id}`).send();

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(accounts[0].id);
    expect(result.body.data.name).toBe(accounts[0].name);
    expect(result.body.data.user_id).toBe(accounts[0].user_id);
  });

  it('should update an account', async () => {
    const accounts = await app.db('accounts')
      .insert({
        name: 'account',
        user_id: user.id,
      }, '*');

    const result = await request(app).put(`${mainRoute}/${accounts[0].id}`).send({
      name: 'new_account_name',
    });

    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe('new_account_name');
  });

  it('should delete an account', async () => {
    const accounts = await app.db('accounts')
      .insert({
        name: 'account',
        user_id: user.id,
      }, '*');

    const result = await request(app).delete(`${mainRoute}/${accounts[0].id}`).send();

    expect(result.status).toBe(204);
  });
});
