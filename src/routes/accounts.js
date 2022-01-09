module.exports = (app) => {
  const create = async (req, res) => {
    const { status, data, error } = await app.services.accounts.create(req.body, '*');
    return res.status(status).json({ data, error });
  };

  const findAll = (req, res) => {
    app.services.accounts.findAll()
      .then((accounts) => res.status(200).json({ data: accounts }));
  };

  const findById = (req, res) => {
    app.services.accounts.findById({ id: req.params.id })
      .then((account) => res.status(200).json({ data: account[0] }));
  };

  return { create, findAll, findById };
};
