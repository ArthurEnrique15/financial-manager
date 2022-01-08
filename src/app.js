const express = require('express');

const app = express();

app.get('/', (req, res) => res.status(200).send());

app.get('/users', (req, res) => {
  const users = [
    { name: 'Arthur Enrique', email: 'arthur@mail.com' },
  ];
  res.status(200).json(users).send();
});

module.exports = app;
