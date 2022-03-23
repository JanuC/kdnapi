var express = require('express');
var router = express.Router();

// 引入订单处理模块
const printServeces = require("../utils/servieces/printServeces")

router.post("/getPrint", printServeces.printFaceSheet);

module.exports = router;