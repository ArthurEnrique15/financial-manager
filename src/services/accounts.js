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

  return { create, findAll };
};
