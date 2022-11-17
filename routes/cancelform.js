const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', function (req, res, next) {
    let helpid = req.body.helpid;
    let taskid = req.body.taskid;
    knex("helps").where('helpid', parseInt(helpid)).
        del()
        .then(function () {
            knex
            .raw('update tasks set number_of_applicants =number_of_applicants-1 where id=?;',[taskid])
            .then(function(){
                res.redirect('/');
            })
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/');
        });
});

module.exports = router;