var express = require('express');
var router = express.Router();

// 引入用户登录模块
const servive = require("../utils/servieces/userServieces")

// 引入 token 验证模块
const { decoded } = require("../utils/jwt/user-jwt")

// 用户登录路由
router.post("/login", servive.login)

// token 验证
router.post("/checkToken", (req, res) => {
  decoded(req, res)
})

module.exports = router;
