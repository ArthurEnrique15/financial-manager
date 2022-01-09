module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('users').where(filter).select();
  };

  const create = async (user) => {
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

    const emailAlreadyExists = await findAll({ mail: user.mail });

    if (emailAlreadyExists && emailAlreadyExists.length > 0) {
      return {
        status: 400,
        error: 'Email already exists',
      };
    }

    const createdUser = await app.db('users').insert(user, '*');

    return {
      status: 201,
      data: createdUser[0],
    };
  };

  return { findAll, create };
};
