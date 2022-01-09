module.exports = (app) => {
  const findAll = () => {
    return app.db('users').select();
  };

  const save = async (user) => {
    const createdUser = await app.db('users').insert(user, '*');

    return createdUser;
  };

  return { findAll, save };
};
