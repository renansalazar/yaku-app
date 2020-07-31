'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const api = require('../api/api');
const cors = require('cors');
const path = require('path');

module.exports.start = (url, port, repo) => {
  const app = express();
  //app.use(express.static('./public'));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  api(app, repo);
  
  const absolutePath = path.join(path.dirname(path.dirname(__dirname)), '/client/build')
  
  app.use(express.static(absolutePath));
  app.get('*', (req,res) =>{
    res.sendFile(absolutePath);
  });

  app.listen(port, '0.0.0.0', () => {
    console.log('=====================');
    console.log('Correctly deployed!');
    console.log('=====================');
    console.log("Server starting on ...");
    console.log("URL: " + url);
    console.log("Port: " + port);
  });
}




