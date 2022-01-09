module.exports = {
  test: {
    client: 'pg',
    version: '9.6',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'admin',
      database: 'financial-manager',
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};
