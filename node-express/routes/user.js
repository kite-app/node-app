/*
 * @Author: kite 
 * @Date: 2019-05-05 10:31:54 
 * @Last Modified by: kite
 * @Last Modified time: 2019-05-05 11:40:59
 */
var express = require('express');
var router = express.Router();

router.get('/login', function (req, res, next) {
	const { username, password } = req.body;
	res.json({
		errorNo: 0,
		data: {
			username,
		}
	})
});

module.exports = router;
