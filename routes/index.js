const e = require('express');
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  knex("users").where({
    id: userId,
  })
    .select("*")
    .then(function (results) {
      if(isAuth){
        if(results[0].class==0){
          res.redirect('/helpuser');
        }else{
          res.redirect('/needhelpuser');
        }
      }else{
      res.render('index', {
      });
      }
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
      });
    });
});
module.exports = router;