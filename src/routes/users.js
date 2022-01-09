const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.post('', async (req, res, next) => {
    app.services.users.create(req.body, '*')
      .then((data) => res.status(201).json(data))
      .catch((err) => next(err));
  });

  router.get('', (req, res) => {
    app.services.users.findAll()
      .then((users) => res.status(200).json(users));
  });

  return router;
};
