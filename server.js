const express = require('express');
const projectrouter = require('./project-router');
const actionrouter = require('./action-router');
const server = express();
server.use(express.json());
server.use('/projects', projectrouter);
server.use('/actions', actionrouter);

server.get('/', (req, res) => {
  res.send('we are receiveing data from the api request api');
});
server.use((error, req, res, next) => {
  res.status(400).json({ message: '', error });
});

module.exports = server;
