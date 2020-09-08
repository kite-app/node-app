/*
 * @Author: kite 
 * @Date: 2019-03-16 15:02:21 
 * @Last Modified by: kite
 * @Last Modified time: 2019-05-04 21:22:39
 */
const querystring = require('querystring');
const { get, set } = require('./src/database/redis');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const { access } = require('./src/utils/log');

const SESSION_DATA = {};

// 获取 cookie 过期时间
const getCookieExpires = () => {
  const date = new Date();
  // 24 * 60 * 60 * 1000
  date.setTime(date.getTime() + (90 * 1000))
  return date.toGMTString(); // GMT格式
}

// 处理post data
const HandlePostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      return resolve({})
    }
    if (req.headers['content-type'] !== 'application/json') {
      return resolve({})
    }

    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    })
    req.on('end', () => {
      if (!postData) {
        return resolve({})
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise;
}

const serverHandle = (req, res) => {
  // 记录 access 日志
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`);

  // 设置返回格式 
  res.setHeader('Content-type', 'application/json');

  // 通过request 来获取截取path
  const url = req.url;
  req.path = url.split('?')[0];

  // 通过node querystring 来解析 query 参数
  req.query = querystring.parse(url.split('?')[1]);

  // 解析cookie
  req.cookie = {};
  const cookiteStr = req.headers.cookie || ''; // a=a1;b=b2;c=c3
  cookiteStr.split(';').forEach(item => {
    if (!item) return;
    const arr = item.split('=');
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  })
  console.log('cookie:' + JSON.stringify(req.cookie))

  // 解析session
  // let needSetCookie = false;
  // let userId = req.cookie.userid;
  // if (userId) {
  //   neetSetCookie = false;
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {}
  //   }
  // } else {
  //   neetSetCookie = true;
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]

  //  使用redis解析session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    set(userId, {});
  }
  req.sessionId = userId;
  get(userId).then(sessionData => {
    if (sessionData == null) {
      set(req.sessionId, {})
      req.session = {}
    } else {
      req.session = sessionData;
    }
    console.log('req.session:', req.session)
    // 处理 post data
    return HandlePostData(req)

  }).then(postData => {
    req.body = postData;

    // 处理blog
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      if (needSetCookie) {
        // 设置返回cookie
        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`); // httpOnly 限制cookie只能从后台返回
      }
      return blogResult.then(blogData => {
        res.end(JSON.stringify(blogData))
      })
    }

    // 处理登陆
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      if (needSetCookie) {
        // 设置返回cookie
        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`); // httpOnly 限制cookie只能从后台返回
      }
      return userResult.then(userData => {
        res.end(JSON.stringify(userData))
      })
    }

    // 未命中路由处理
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.write("404 Not Function\n");
    res.end();
  })
}

module.exports = serverHandle;

