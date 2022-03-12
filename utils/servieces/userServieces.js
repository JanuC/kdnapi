// 该 js 文件用于验证后台登录功能

// 引入封装好的 mysql 模块
const { querySelect } = require("../mysql/db")

// 引入 jwt 模块， 用于 token 验证
const jwt = require("jsonwebtoken")

// 引入 token 常量
const {
  CODE_ERROR,
  CODE_SUCCESS,
  PRIVATE_KEY,
  JWT_EXPIRED
} = require("../jwt/jwt.config")

// 登录功能
function login(req, res) {
  const { username, password } = req.body
  const sqlStr = `select * from ho_bank_admin_message where username = '${ username }'`
  querySelect(sqlStr)
  // 注意：这里 .then 不能使用 res 当形参，因为 querySql 方法中已经存在 res 了
  .then(user => {
    // console.log(user);
    if (!user || user.length === 0) {
      // 用户名或密码错误
      res.json({
        code: CODE_ERROR,
        msg: "用户名或密码错误"
      })
    } else {
      // 登录成功 生成token并返回
      const token = jwt.sign(
        // payload : 签发的token里需要包含一些该用户的信息
        { username },
        // 私钥
        PRIVATE_KEY,
        // 设置过期时间
        { expiresIn: JWT_EXPIRED }
      )
      res.json({
        code: CODE_SUCCESS,
        msg: "登录成功",
        data: {
          username,
          token
        }
      })
    }
  })
}

module.exports = {
  login
}