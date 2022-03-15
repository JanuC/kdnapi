// 该 js 文件用于存储生成 token 相关信息
module.exports = {
  CODE_ERROR: 201, //请求相应失败 CODE
  CODE_SUCCESS: 200, // 请求相应成功CODE 
  CODE_TOKEN_ERPIRED: 403, // token验证失败 返回
  PRIVATE_KEY: 'hongzhengdianshang', // 密钥
  JWT_EXPIRED: 60*60*4  //过期时间： 4小时  
}