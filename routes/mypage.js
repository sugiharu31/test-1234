const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
        res.render("mypage",
        {
            title: 'マイページ',
        })
});
module.exports = router;