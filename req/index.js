const req = require('../utils/mp-req/index.js');
// api
const ticketApi = require('./api/ticket.js');

const apiUrlTable = {
  local: 'http://10.1.1.4:9501/'
};
const apiUrl = apiUrlTable.local;

/**
 * code换取sessionId
 * @param {string} code
 */
function code2sessionId(code) {
  return new Promise((res, rej) => {
    wx.request({
      url: `${apiUrl}/user/login`,
      method: 'POST',
      data: {
        code,
      },
      success(r1) {
        if (r1.data && r1.data.code === 0) {
          res(r1.data.data.sessionId);
        } else {
          rej(r1);
        }
      },
      fail: rej,
    });
  });
}

/**
 * 检查session是否有效
 * @param {any} res
 */
function isSessionAvailable(res) {
  return res.code !== 3000;
}

req.init({
  apiUrl,
  code2sessionId,
  isSessionAvailable,
});

req.use(ticketApi);

module.exports = req;
