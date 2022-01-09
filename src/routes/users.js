module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.users.findAll()
      .then((users) => res.status(200).json(users));
  };

  const create = async (req, res, next) => {
    app.services.users.create(req.body, '*')
      .then((data) => res.status(201).json(data))
      .catch((err) => next(err));
  };

  return { findAll, create };
};
