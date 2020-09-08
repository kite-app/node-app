/*
 * @Author: kite 
 * @Date: 2019-03-17 15:37:18 
 * @Last Modified by: kite
 * @Last Modified time: 2019-04-13 09:43:13
 */

const env = process.env.NODE_ENV;

let MYSQL_CONF;
let REDIS_CONF;

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'kite8831',
    database: 'nodeApp',
  }

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'kite8831',
    database: 'nodeApp',
  }

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
