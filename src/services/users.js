const ValidationError = require('../errors/validation-error');

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('users').where(filter).select();
  };

  const create = async (user) => {
    if (!user.name) {
      throw new ValidationError('Name is required');
    }

    if (!user.mail) {
      throw new ValidationError('Email is required');
    }

    if (!user.password) {
      throw new ValidationError('Password is required');
    }

    const emailAlreadyExists = await findAll({ mail: user.mail });

    if (emailAlreadyExists && emailAlreadyExists.length > 0) {
      throw new ValidationError('Email already exists');
    }

    const createdUser = await app.db('users').insert(user, '*');

    return createdUser[0];
  };

  return { findAll, create };
};
