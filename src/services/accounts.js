const ValidationError = require('../errors/validation-error');

module.exports = (app) => {
  const create = async (account) => {
    if (!account.name) {
      throw new ValidationError('Name is required');
    }

    const accountAlreadyExists = await find({
      name: account.name,
      user_id: account.user_id,
    });

    if (accountAlreadyExists) {
      throw new ValidationError('Account already exists');
    }

    const createdAccount = await app.db('accounts').insert(account, '*');

    return createdAccount[0];
  };

  const findByUser = (userId) => {
    return app.db('accounts')
      .where({ user_id: userId })
      .select();
  };

  const findById = (id) => {
    return app.db('accounts')
      .where(id)
      .first();
  };

  const find = (filter = {}) => {
    return app.db('accounts')
      .where(filter)
      .first();
  };

  const update = (id, account) => {
    return app.db('accounts')
      .where({ id })
      .update(account, '*');
  };

  const remove = (id) => {
    return app.db('accounts')
      .where({ id })
      .delete();
  };

  return {
    create,
    findByUser,
    findById,
    find,
    update,
    remove,
  };
};
