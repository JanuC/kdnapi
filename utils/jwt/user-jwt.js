// 该 js 文件用于定义 token 验证和解析函数

// 引入 jsonwebtoken
const jwt = require("jsonwebtoken")

// 引入 express-jwt 用于token认证
const expressJWT = require("express-jwt")

// 引入 token 私钥
const { PRIVATE_KEY } = require("./jwt.config")

// 验证 token 是否过期
const jwtAuth = expressJWT({
  secret: PRIVATE_KEY,
  algorithms: ["HS256"],
  // 是否进行校验
  credentialsRequired: true,
  // 自定义获取 token 的函数
  getToken: (req) => {
    if (req.headers.authorization) {
      return req.headers.authorization
    } else if (req.query && req.query.token) {
      return req.query.token
    }
  }
})
// 不进行 token 校验的地址
.unless({
  path: [
    "/api/login"
  ]
})

// jwt-token 解析
function decode(req, res) {
  // 获取 请求中的 token
  const token = req.get("Authorization")
  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      res.json({
        code: 401
      })
    } else {
      res.json({
        code: 200
      })
    }
  })
}

module.exports = {
  jwtAuth,
  decode
}