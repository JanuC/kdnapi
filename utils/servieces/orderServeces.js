// 该 js 文件用于处理订单相关请求

const { querySelect } = require("../mysql/db");

const sendResults = require("./results");

// 查询订单功能
function selectOrders(req, res) {
  const sqlStr = "select * from ho_shopro_order order by createtime desc";
  querySelect(sqlStr).then(results => {
    sendResults(res, results)
  })
}

// 查询商品详情功能
function getGoodsMsg(req, res) {
  const sqlStr = "select * from ho_shopro_order_item"
  querySelect(sqlStr).then(results => {
    sendResults(res, results)
  })
}

module.exports = {
  selectOrders,
  getGoodsMsg,
}