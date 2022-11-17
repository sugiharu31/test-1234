const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)

router.post('/', function (req, res, next) {
    let taskid = req.body.taskid;
    const userId = req.session.userid;
    let helpAt = dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss');
    knex("helps")
        .insert({ user_id: userId, task_id: taskid ,help_dt:helpAt})
        .then(function () {
            knex
            .raw('update tasks set number_of_applicants =number_of_applicants+1 where id=?;',[taskid])
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