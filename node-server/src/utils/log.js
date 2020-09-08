/*
 * @Author: kite 
 * @Date: 2019-05-04 21:12:02 
 * @Last Modified by: kite
 * @Last Modified time: 2019-05-04 21:20:09
 */
const fs = require('fs');
const path = require('path');

// 生成日志
function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream;
}

//写日志
function writeLog(writeStream, log) {
  writeStream.write(`${log}\n`);
}

const accessWriteStream = createWriteStream('access.log');
function access(log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}