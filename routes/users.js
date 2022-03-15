var express = require('express');
var router = express.Router();

// 引入用户登录模块
const userServive = require("../utils/servieces/userServieces")

// 引入 token 验证模块
const { decoded } = require("../utils/jwt/user-jwt")

// 用户登录路由
router.post("/login", userServive.login)

// token 验证
router.post("/checkToken", userServive.checkToken)

module.exports = router;
