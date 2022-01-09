module.exports = (app) => {
  const create = async (account) => {
    const createdAccount = await app.db('accounts').insert(account, '*');

    return {
      status: 201,
      data: createdAccount[0],
    };
  };

  const findAll = (filter = {}) => {
    return app.db('accounts').where(filter).select();
  };

  const findById = (id) => {
    return app.db('accounts').where(id).select();
  };

  const update = (id, account) => {
    return app.db('accounts')
      .where({ id })
      .update(account, '*');
  };

  return {
    create,
    findAll,
    findById,
    update,
  };
};
