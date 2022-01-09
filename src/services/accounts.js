const ValidationError = require('../errors/validation-error');

module.exports = (app) => {
  const create = async (account) => {
    if (!account.name) {
      throw new ValidationError('Name is required');
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
    update,
    remove,
  };
};
