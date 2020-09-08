/*
 * @Author: kite 
 * @Date: 2019-04-13 09:44:01 
 * @Last Modified by: kite
 * @Last Modified time: 2019-04-14 16:39:41
 */
const redis = require('redis');

const { REDIS_CONF } = require('../config/db');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('err', (err, val) => {
  if (err) {
    console.log(val)
  }
})

function set(key, val) {
  if (key && val) {
    if (typeof val === 'object') {
      val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print);
  }
}

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        return reject(val)
      }

      if (val == null) {
        return resolve(null)
      }

      try {
        resolve(JSON.parse(val))
      } catch (ex) {
        resolve(ex)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}