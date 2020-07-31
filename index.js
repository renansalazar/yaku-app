'use strict'
const server = require('./src/server/server');
const Service = require('./src/repository/repository');
const config = require('./src/config');

process.on('uncaughtException', (err) => {
  console.log('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
});

const repo = new Service(config.repositorySettings);
server.start(config.serverSettings.url, config.serverSettings.port, repo);

