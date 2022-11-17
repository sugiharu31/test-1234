const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  knex("position_test")
    .select("*")
    .then(function (results) {
      res.render("map",
        {
          title: 'Map',
          position: results,
        })
    })
    .catch(function (err) {
      console.error(err);
      res.render("map",
        {
          title: 'Map',
        })
    });
});



module.exports = router;