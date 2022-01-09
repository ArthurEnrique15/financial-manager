const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const mainRoute = '/v1/accounts';

let user;

describe('accounts tests', () => {
  // creates an user before the accounts tests
  beforeAll(async () => {
    user = await app.services.users.create({
      name: 'Arthur Enrique',
      mail: `${Date.now()}@mail.com`,
      password: 'password',
    });

    user.token = jwt.encode(user, 'segredo');
  });

  it('should post an account', async () => {
    const result = await request(app).post(mainRoute)
      .send({
        name: 'test account',
        user_id: user.id,
      })
      .set('authorization', `bearer ${user.token}`);

    expect(result.status).toBe(201);
    expect(result.body.name).toBe('test account');
  });

  it('should not post a nameless account', async () => {
    const result = await request(app).post(mainRoute)
      .send({
        user_id: user.id,
      })
      .set('authorization', `bearer ${user.token}`);

    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Name is required');
  });

  // TODO create test 'should not post a duplicate account for the same user'
  it.skip('should not post a duplicate account for the same user', () => {
  });

  it('should list all accounts', async () => {
    await app.db('accounts')
      .insert({
        name: 'account list',
        user_id: user.id,
      });

    const result = await request(app)
      .get(mainRoute)
      .send()
      .set('authorization', `bearer ${user.token}`);

    expect(result.status).toBe(200);
    expect(result.body.length).toBeGreaterThan(0);
  });

  // TODO create test 'should list only user accounts'
  it.skip('should list only user accounts', () => {
  });

  it('should get an account by id', async () => {
    const accounts = await app.db('accounts')
      .insert({
        name: 'account',
        user_id: user.id,
      }, '*');

    const result = await request(app)
      .get(`${mainRoute}/${accounts[0].id}`)
      .send()
      .set('authorization', `bearer ${user.token}`);

    expect(result.status).toBe(200);
    expect(result.body.id).toBe(accounts[0].id);
    expect(result.body.name).toBe(accounts[0].name);
    expect(result.body.user_id).toBe(accounts[0].user_id);
  });

  // TODO create test 'should not get an account from other user'
  it.skip('should not get an account from other user', () => {
  });

  it('should update an account', async () => {
    const accounts = await app.db('accounts')
      .insert({
        name: 'account',
        user_id: user.id,
      }, '*');

    const result = await request(app)
      .put(`${mainRoute}/${accounts[0].id}`)
      .send({
        name: 'new_account_name',
      })
      .set('authorization', `bearer ${user.token}`);

    expect(result.status).toBe(200);
    expect(result.body.name).toBe('new_account_name');
  });

  // TODO create test 'should not update an account from other user'
  it.skip('should not update an account from other user', () => {
  });

  it('should delete an account', async () => {
    const accounts = await app.db('accounts')
      .insert({
        name: 'account',
        user_id: user.id,
      }, '*');

    const result = await request(app)
      .delete(`${mainRoute}/${accounts[0].id}`)
      .send()
      .set('authorization', `bearer ${user.token}`);

    expect(result.status).toBe(204);
  });

  // TODO create test 'should not delete an account from other user'
  it.skip('should not delete an account from other user', () => {
  });
});
