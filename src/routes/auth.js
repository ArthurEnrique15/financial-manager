const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

const secret = 'segredo';

module.exports = (app) => {
  const signIn = async (req, res, next) => {
    const { password } = req.body;

    app.services.users.findOne({ mail: req.body.mail })
      .then((user) => {
        if (bcrypt.compareSync(password, user.password)) {
          const payload = {
            id: user.id,
            name: user.name,
            mail: user.mail,
          };

          const token = jwt.encode(payload, secret);
          res.status(200).json({ token });
        }
      })
      .catch((err) => next(err));
  };

  return { signIn };
};
