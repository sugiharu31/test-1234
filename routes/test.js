const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  knex.raw('select * from helps inner join tasks on helps.task_id = tasks.id where user_id=?',[userId])
    .then(function (result) {
      res.render("test", {
        results: result
      });
    })
    .catch(function (err) {
      res.render("test", {
      });
    });

});




module.exports = router;