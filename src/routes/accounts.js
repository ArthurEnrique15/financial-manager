module.exports = (app) => {
  const create = async (req, res) => {
    try {
      const data = await app.services.accounts.create(req.body, '*');
      return res.status(201).json(data);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  const findAll = (req, res) => {
    app.services.accounts.findAll()
      .then((accounts) => res.status(200).json(accounts));
  };

  const findById = (req, res) => {
    app.services.accounts.findById({ id: req.params.id })
      .then((account) => res.status(200).json(account[0]));
  };

  const update = (req, res) => {
    app.services.accounts.update(req.params.id, req.body)
      .then((account) => res.status(200).json(account[0]));
  };

  const remove = (req, res) => {
    app.services.accounts.remove(req.params.id)
      .then(() => res.status(204).send());
  };

  return {
    create,
    findAll,
    findById,
    update,
    remove,
  };
};
