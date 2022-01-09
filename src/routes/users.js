module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.users.findAll()
      .then((users) => res.status(200).json({ data: users }));
  };

  const create = async (req, res) => {
    const { status, data, error } = await app.services.users.create(req.body, '*');
    return res.status(status).json({ data, error });
  };

  return { findAll, create };
};
