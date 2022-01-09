module.exports = (app) => {
  const create = async (req, res, next) => {
    app.services.users.create(req.body, '*')
      .then((data) => res.status(201).json(data))
      .catch((err) => next(err));
  };

  const findAll = (req, res) => {
    app.services.users.findAll()
      .then((users) => res.status(200).json(users));
  };

  const findOne = (req, res) => {
    app.services.users.findOne()
      .then((user) => res.status(200).json(user));
  };

  return { create, findAll, findOne };
};
