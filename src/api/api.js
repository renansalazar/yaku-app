'use strict'
const express = require('express');
const router = express.Router();
const status = require('http-status');
//const callWatson = require('../watson/watson');

module.exports = (app, repo) => {

    router.post('/insert', async (req, res) => {
        let insert = await repo.insert(req.body);
        res.status(status.OK).jsonp(insert);
        console.log('[Route]: /insert');
    });

    
    router.get('/list', async (req, res) => {
        let list = await repo.list();
        res.status(status.OK).jsonp(list);
        console.log('[Route]: /list');
    });
    
    router.post('/uploadimage', async (req, res) => {
        let insert = await repo.insert(req.body);
        res.status(status.OK).jsonp(insert);
        console.log('[Route]: /insert');
    });

    app.use('/', router);
};
