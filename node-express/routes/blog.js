/*
 * @Author: kite 
 * @Date: 2019-05-05 10:32:02 
 * @Last Modified by:   kite 
 * @Last Modified time: 2019-05-05 10:32:02 
 */

var express = require('express');
var router = express.Router();

router.get('/list', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
