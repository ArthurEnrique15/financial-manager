const bcrypt = require('bcrypt');
const ValidationError = require('../errors/validation-error');

module.exports = (app) => {
  const getPasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
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

    const emailAlreadyExists = await findOne({ mail: user.mail });

    if (emailAlreadyExists) {
      throw new ValidationError('Email already exists');
    }

    const userToBeCreated = {
      name: user.name,
      mail: user.mail,
      password: getPasswordHash(user.password),
    };

    const createdUser = await app.db('users')
      .insert(userToBeCreated, ['id', 'name', 'mail']);

    return createdUser[0];
  };

  const findAll = () => {
    return app.db('users')
      .select(['id', 'name', 'mail']);
  };

  const findOne = (filter = {}) => {
    return app.db('users')
      .where(filter)
      .first();
  };

  return { findAll, create, findOne };
};
