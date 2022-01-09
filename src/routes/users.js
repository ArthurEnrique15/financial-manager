module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.users.findAll()
      .then((users) => res.status(200).json(users));
  };

  const save = async (req, res) => {
    const { status, data, error } = await app.services.users.save(req.body, '*');
    res.status(status).json({ data, error });
  };

  return { findAll, save };
};
