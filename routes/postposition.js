const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', function (req, res, next) {
    let mylng=req.body.mylng;
    let mylat=req.body.mylat;
    let contents=req.body.contents;
    knex("position_test")
        .insert({ lat: mylat, lng: mylng,contents:contents })
        .then(function () {
            res.redirect('/map');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/map');
        });
});

module.exports = router;