/*
 * @Author: kite 
 * @Date: 2019-05-04 21:36:45 
 * @Last Modified by: kite
 * @Last Modified time: 2019-05-04 21:44:02
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 文件名
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log');
const readStream = fs.createReadStream(fileName);

const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0;
let sum = 0;

rl.on('line', lineData => {
    if (!lineData) {
        return console.log(lineData);
    }
    sum++;

    const arr = lineData.split(' -- ');
    if (arr[2] && arr[2].indexOf('Chrome') >= 0) {
        chromeNum++
    }
})

rl.on('close', () => {
    console.log('chrome访问总数' + chromeNum)
})