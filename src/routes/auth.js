const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const ValidationError = require('../errors/validation-error');

const secret = 'segredo';

module.exports = (app) => {
  const router = express.Router();

  router.post('/signin', async (req, res, next) => {
    const { password } = req.body;

    app.services.users.findOne({ mail: req.body.mail })
      .then((user) => {
        // if user doesn't exists or passwords doesn't match, throw validation error
        if (!user || !bcrypt.compareSync(password, user.password)) {
          throw new ValidationError('Invalid mail or password');
        } else {
          const payload = {
            id: user.id,
            name: user.name,
            mail: user.mail,
          };

          const token = jwt.encode(payload, secret);
          res.status(200).json({ token });
        }
      })
      .catch((err) => next(err));
  });

  router.post('/signup', async (req, res, next) => {
    app.services.users.create(req.body, '*')
      .then((data) => res.status(201).json(data))
      .catch((err) => next(err));
  });

  return router;
};
