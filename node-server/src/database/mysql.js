/*
 * @Author: kite 
 * @Date: 2019-03-17 15:40:28 
 * @Last Modified by: kite
 * @Last Modified time: 2019-05-04 21:47:30
 */
const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');

const con = mysql.createConnection(MYSQL_CONF);

con.connect();

// sql query 
function exec(sql) {
  return promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    })
  })
}

module.exports = {
  exec,
  escape: mysql.escape
}
