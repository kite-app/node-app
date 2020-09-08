var express = require('express');
var router = express.Router();

/* GET users listing. */
// 子路由
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
