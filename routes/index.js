var express = require('express');
var router = express.Router();

const userRouter = require("./users")
const orderRouter = require("./order")

const { jwtAuth } = require("../utils/jwt/user-jwt")
router.use(jwtAuth)

router.use("/api", userRouter, orderRouter)


// 自定义统一异常处理中间件，需要放在代码最后
// router.use((err, req, res, next) => {
//   // console.log(req);
//   // 自定义用户认证失败的错误返回
//   // console.log('err===', err); 
//   if (err && err.name === 'UnauthorizedError') {
//     console.log('xxx');
//     const { status = 401, message } = err;
//     // 抛出401异常
//     res.status(status).json({
//       code: status,
//       msg: 'token失效，请重新登录',
//       data: null
//     })
//   } else {
//     const { output } = err || {};
//     // 错误码和错误信息
//     const errCode = (output && output.statusCode) || 500;
//     const errMsg = (output && output.payload && output.payload.error) || err.message;
//     res.status(errCode).json({
//       code: errCode,
//       msg: errMsg
//     })
//   }

// })

module.exports = router;
