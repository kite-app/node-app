/*
 * @Author: kite 
 * @Date: 2019-05-04 22:11:55 
 * @Last Modified by: kite
 * @Last Modified time: 2019-05-04 22:15:51
 */

const crypto = require('crypto');

// 密钥
const KEY = 'Kite_3123.*';

// md5加密 
function md5(content) {
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

// 加密
function genPassword(password) {
    const str = `password=${password}&key=${KEy}`
    return md5(str)
}
