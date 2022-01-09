module.exports = (app) => {
  const findAll = () => {
    return app.db('users').select();
  };

  const save = async (user) => {
    if (!user.name) {
      return {
        status: 400,
        error: 'Name is required',
      };
    }

    const createdUser = await app.db('users').insert(user, '*');

    return {
      status: 201,
      data: createdUser[0],
    };
  };

  return { findAll, save };
};
