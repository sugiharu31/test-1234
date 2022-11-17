const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', function (req, res, next) {
    let taskid = req.body.taskid;
    let message = req.body.message;
    knex("tasks").where('id',parseInt(taskid)).
    update({
        message:message
        })
        .then(function () {
            res.redirect('/');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/');
        });
});

module.exports = router;