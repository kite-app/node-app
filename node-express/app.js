var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev')); // 记录日志
app.use(express.json());  // 一系列处理get/post请求的参数 返回到 req.body里面
app.use(express.urlencoded({ extended: false })); // 兼容post表单请求其他格式
app.use(cookieParser());// 解析cookie
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter); // 根路由
// app.use('/users', usersRouter); // 父路由

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
