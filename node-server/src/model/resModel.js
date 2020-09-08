/*
 * @Author: kite 
 * @Date: 2019-03-16 15:01:50 
 * @Last Modified by: kite
 * @Last Modified time: 2019-05-02 17:03:16
 */

class BaseModel {
  constructor(data, errorNo, msg) {
    if (typeof data === 'string') {
      this.msg = data;
      this.errorNo = -1;
      data = null;
      msg = null;
    }

    if (typeof data === 'number') {
      this.errorNo = data;
      this.msg = errorNo;
      data = null;
      msg = null;
    }

    if (data) {
      this.data = data;
    }
    if (msg) {
      this.msg = msg;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, errorNo, msg) {
    super(data, errorNo, msg);
    this.errorNo = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(data, errorNo, msg) {
    super(data, errorNo, msg);
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}