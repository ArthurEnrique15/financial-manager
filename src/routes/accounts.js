module.exports = (app) => {
  const create = async (req, res, next) => {
    app.services.accounts.create(req.body, '*')
      .then((data) => res.status(201).json(data))
      .catch((err) => next(err));
  };

  const findAll = async (req, res, next) => {
    app.services.accounts.findAll()
      .then((data) => res.status(200).json(data))
      .catch((err) => next(err));
  };

  const findById = async (req, res, next) => {
    app.services.accounts.findById({ id: req.params.id })
      .then((data) => res.status(200).json(data[0]))
      .catch((err) => next(err));
  };

  const update = async (req, res, next) => {
    app.services.accounts.update(req.params.id, req.body)
      .then((data) => res.status(200).json(data[0]))
      .catch((err) => next(err));
  };

  const remove = async (req, res, next) => {
    app.services.accounts.remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  };

  return {
    create,
    findAll,
    findById,
    update,
    remove,
  };
};
