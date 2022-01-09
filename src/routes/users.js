module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.users.findAll()
      .then((users) => res.status(200).json({ data: users }));
  };

  const create = async (req, res) => {
    try {
      const data = await app.services.users.create(req.body, '*');
      return res.status(201).json(data);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  return { findAll, create };
};
