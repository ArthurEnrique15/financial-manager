const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const mainRoute = '/v1/accounts';

let user;
let user2;

describe('accounts tests', () => {
  // creates an user before the accounts tests
  beforeEach(async () => {
    user = await app.services.users.create({
      name: 'Arthur Enrique',
      mail: `${Date.now()}@mail.com`,
      password: 'password',
    });

    user.token = jwt.encode(user, 'segredo');

    user2 = await app.services.users.create({
      name: 'Arthur Enrique',
      mail: `${Date.now()}@mail.com`,
      password: 'password',
    });
  });

  it('should post an account', async () => {
    const result = await request(app).post(mainRoute)
      .send({ name: 'test account' })
      .set('authorization', `bearer ${user.token}`);

    expect(result.status).toBe(201);
    expect(result.body.name).toBe('test account');
  });

  it('should not post a nameless account', async () => {
    const result = await request(app).post(mainRoute)
      .send()
      .set('authorization', `bearer ${user.token}`);

    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Name is required');
  });

  it('should not post a duplicate account for the same user', async () => {
    await app.db('accounts')
      .insert({
        name: 'user account',
        user_id: user.id,
      });

    const res = await request(app)
      .post(mainRoute)
      .send({
        name: 'user account',
        user_id: user.id,
      })
      .set('authorization', `bearer ${user.token}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Account already exists');
  });

  it('should list only user accounts', async () => {
    await app.db('accounts')
      .insert([
        {
          name: 'user1 account',
          user_id: user.id,
        },
        {
          name: 'user2 account',
          user_id: user2.id,
        },
      ]);

    const res = await request(app)
      .get(mainRoute)
      .send()
      .set('authorization', `bearer ${user.token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('user1 account');
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
