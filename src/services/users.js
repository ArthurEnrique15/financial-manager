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

    if (!user.mail) {
      return {
        status: 400,
        error: 'Email is required',
      };
    }

    if (!user.password) {
      return {
        status: 400,
        error: 'Password is required',
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
