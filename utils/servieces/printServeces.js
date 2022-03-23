// 该 js 文件用于处理打印面单功能
const axios = require("axios");
const querystring = require("querystring");
const getParams = require("./getParams/getParams");
async function printFaceSheet(req, res) {
  const sender = req.body.sendMessage;
  const receiver = req.body.consigneeMessage;
  const commodity = req.body.commodityMessage;
  const orderCode = req.body.orderCode;
  const params = {
    sender,
    receiver,
    commodity,
    orderCode
  }
  await sendPrint('https://api.kdniao.com/api/EOrderService', params).then(results => {
    // console.log(x);
    res.json({
      code: 200,
      data: results.data
    })
  })
  // console.log(results);
    
}
async function sendPrint(url, params) {
  const results = await post(url, params)
  return results;
  // const res = await axios.post(url, querystring.stringify(data));
  // return res;
}
async function post(url, params) {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  const data = getParams(params);
  // console.log(data);
  const res = await axios.post(url,querystring.stringify(data));
  return res;
}
module.exports = {
  printFaceSheet,
}