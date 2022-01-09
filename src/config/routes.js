module.exports = (app) => {
  app.route('/auth/signin')
    .post(app.routes.auth.signIn);

  app.route('/users')
    .all(app.config.passport.authenticate())
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);

  app.route('/accounts')
    .all(app.config.passport.authenticate())
    .post(app.routes.accounts.create)
    .get(app.routes.accounts.findAll);

  app.route('/accounts/:id')
    .all(app.config.passport.authenticate())
    .get(app.routes.accounts.findById)
    .put(app.routes.accounts.update)
    .delete(app.routes.accounts.remove);
};
