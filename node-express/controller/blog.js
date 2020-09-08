/*
 * @Author: kite 
 * @Date: 2019-03-16 15:01:41 
 * @Last Modified by: kite
 * @Last Modified time: 2019-05-04 22:09:37
 */
const { exec, escape } = require('../database/mysql');
const xss = require('xss');

const getList = (author, keyword) => {

  // where 1=1 预防 author keyword 没有值导致sql语句报错；
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    author = escape(author);
    sql += `and author=${author} `;
  }
  if (keyword) {
    keyword = escape(keyword);
    sql += `and title like %${keyword}% `;
  }
  sql += `order by id`;
  return exec(sql);
}

const getDetail = id => {
  id = escape(id)
  const sql = `select * from blogs where id=${id}`;
  return exec(sql).then(rows => rows[0]);
}

const newBlog = (blogData = {}) => {
  let { title, content, author } = blogData;
  title = escape(xss(title));
  content = escape(xss(content));
  author = escape(xss(author));
  const createtime = Date.now();

  const sql = `
    insert into blogs (title, content, createtime, author)
    values(${title}, ${content}, ${createtime}, ${author});
  `
  return exec(sql).then(insertData => id = insertData.insertId);
}

const updateBlog = (blogData = {}) => {
  let { id, title, content, author } = blogData;
  id = escape(id);
  title = escape(xss(title));
  content = escape(xss(content));
  author = escape(xss(author));
  const sql = `
      update blogs set title=${title},content=${content} where id=${id}and author=${author} 
  `
  console.log(sql)
  return exec(sql).then(val => {
    console.log(val);
    /*
    val = kPacket {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      serverStatus: 2,
      warningCount: 0,
      message: '(Rows matched: 1  Changed: 0  Warnings: 0',
      protocol41: true,
      changedRows: 0
    }
    */
    return val.affectedRows > 0 ? true : false;
  });
}

const delBlog = (blogData) => {
  let { id, author } = blogData;
  id = escape(id);
  author = escape(author);
  const sql = `
    delete from blogs where id=${id} and author=${author}
  `
  return exec(sql).then(val => {
    console.log(val)
    return val.affectedRows > 0 ? true : false;
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}