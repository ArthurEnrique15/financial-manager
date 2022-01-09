module.exports = (app) => {
  app.route('/auth/signin')
    .post(app.routes.auth.signIn);

  app.route('/users')
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);

  app.route('/accounts')
    .post(app.routes.accounts.create)
    .get(app.routes.accounts.findAll);

  app.route('/accounts/:id')
    .get(app.routes.accounts.findById)
    .put(app.routes.accounts.update)
    .delete(app.routes.accounts.remove);
};
