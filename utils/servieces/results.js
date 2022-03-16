// 该 js 文件用于统一向前端返回数据

function sendResults(res, results) {
  if (results) {
    res.json({
      code: 200,
      data: results
    })
  } else {
    res.json({
      code: 201,
      message: "数据获取失败"
    })
  }
}

module.exports = sendResults