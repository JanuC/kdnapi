var express = require('express');
var router = express.Router();

// 引入订单处理模块
const orderServerces = require("../utils/servieces/orderServeces")

router.post("/getAllOrders", orderServerces.selectOrders);
router.post("/getGoodsMsg", orderServerces.getGoodsMsg);

module.exports = router;