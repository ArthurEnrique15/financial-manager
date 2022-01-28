const express = require('express');

const UnauthorizedResourceError = require('../errors/unauthorized-resource-error');

module.exports = (app) => {
  const router = express.Router();

  router.param('id', async (req, res, next) => {
    app.services.accounts.find({ id: req.params.id })
      .then((account) => {
        if (account.user_id !== req.user.id) {
          throw new UnauthorizedResourceError();
        } else {
          next();
        }
      })
      .catch((err) => next(err));
  });

  router.post('', async (req, res, next) => {
    app.services.accounts.create({
      ...req.body,
      user_id: req.user.id,
    }, '*')
      .then((data) => res.status(201).json(data))
      .catch((err) => next(err));
  });

  router.get('', async (req, res, next) => {
    app.services.accounts.findByUser(req.user.id)
      .then((data) => res.status(200).json(data))
      .catch((err) => next(err));
  });

  router.get('/:id', async (req, res, next) => {
    app.services.accounts.findById({ id: req.params.id })
      .then((data) => res.status(200).json(data))
      .catch((err) => next(err));
  });

  router.put('/:id', async (req, res, next) => {
    app.services.accounts.update(req.params.id, req.body)
      .then((data) => res.status(200).json(data[0]))
      .catch((err) => next(err));
  });

  router.delete('/:id', async (req, res, next) => {
    app.services.accounts.remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  });

  return router;
};
