/*
 * @Author: kite 
 * @Date: 2019-03-16 15:02:10 
 * @Last Modified by: kite
 * @Last Modified time: 2019-05-04 16:34:11
 */
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { loginValidate, signUpValidate } = require('../controller/user');
const { set } = require('../database/redis');

const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登陆
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    console.log('body:', req.body)
    // const { username, password } = req.query;
    const result = loginValidate(username, password);
    return result.then(val => {
      if (val.username) {
        req.session.username = val.username;

        set(req.sessionId, req.session)

        return new SuccessModel(val, '登陆成功');
      }
      return new ErrorModel('登陆失败');
    })
  }

  // 注册
  if (method === 'POST' && req.path === '/api/user/signup') {
    const { username, password, realname } = req.body;
    const result = signUpValidate(username, password, realname);
    return result.then(insertId => {
      if (insertId) {
        return new SuccessModel({ id: insertId }, '注册成功');
      }
      return new ErrorModel('注册失败');
    })

  }

  // 登陆 test
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(new SuccessModel('已登陆'))
    }
    return Promise.resolve(new ErrorModel('尚未登陆'))
  }

}

module.exports = handleUserRouter;