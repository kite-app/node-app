/*
 * @Author: kite 
 * @Date: 2019-03-16 18:57:14 
 * @Last Modified by: kite
 * @Last Modified time: 2019-05-04 21:54:01
 */
const { exec, escape } = require('../database/mysql');
const { ErrorModel } = require('../model/resModel');

const loginValidate = (username, password) => {
  username = escape(username);
  password = escape(password);

  const sql = `
    select id,username from users where username=${username} and password=${password}
  `
  return exec(sql).then(val => {
    console.log(val); // [ RowDataPacket { id: 1, username: 'kite' } ] || []
    return val[0] || {};
  })
}

const signUpValidate = (username, password, realname) => {
  username = escape(username);
  password = escape(password);
  realname = escape(realname);

  const sql = `
    insert into users (username,password,realname) values(${username},${password},${realname});
  `
  return exec(sql).then(val => {
    console.log(val);
    /*
      {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 4,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
    */
    return val.insertId || {};
  })
}


module.exports = {
  loginValidate,
  signUpValidate
}