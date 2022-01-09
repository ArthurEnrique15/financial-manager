module.exports = (app) => {
  const create = async (req, res) => {
    const { status, data, error } = await app.services.accounts.create(req.body, '*');
    return res.status(status).json({ data, error });
  };

  return { create };
};
