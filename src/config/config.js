const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

const path = process.cwd() + '/src/config/.env';
require('dotenv').config({ path: path , silent: true});

const serverSettings = {
  port: appEnv.port,
  url: appEnv.url
}

const repositorySettings = {
  "url": process.env.URL,
  "username": process.env.USERNAME,
  "password": process.env.PASSWORD,
  "db": process.env.DATABASE
}

module.exports = {
  serverSettings, repositorySettings
}
