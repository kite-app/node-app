/*
 * @Author: kite 
 * @Date: 2019-03-16 15:02:04 
 * @Last Modified by: kite
 * @Last Modified time: 2019-05-04 16:34:19
 */
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 登陆检测
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel(403, '未登陆'))
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;
  // 博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    // 查询作者博客列表，需要登陆验证
    if (author) {
      const loginCheckResult = loginCheck(req);
      if (loginCheckResult) {
        return loginCheckResult
      }
    }
    const result = getList(author, keyword);

    return result.then(listData => {
      return new SuccessModel(listData, '请求成功');
    })
  }

  //  博客详情
  if (method === 'GET' && req.path === '/api/blog/detaill') {
    const result = getDetail(id);
    return result.then(data => {
      return new SuccessModel(data, '查询成功');
    })
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult
    }

    const result = newBlog(req.body);
    return result.then(data => {
      return new SuccessModel(data, '新增成功');
    })
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(req.body);
    return result.then(val => {
      if (val) {
        return new SuccessModel('更新成功');
      }
      return new ErrorModel('更新失败');
    })
  }

  // 删除新建博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult
    }
    const result = delBlog(req.body);
    return result.then(val => {
      if (val) {
        return new SuccessModel('删除成功');
      } else {
        return new ErrorModel('删除失败')
      }
    })
  }

}

module.exports = handleBlogRouter;