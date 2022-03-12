// 该 js 文件用于连接数据库

// 引入 mysql 模块
const mysql = require("mysql");

// 引入 连接属性
const dbConfig = require("./db.config");

// 连接数据库
function connect() {
  return mysql.createConnection(dbConfig);
}

// 新建查询连接
function querySql(sql) {
  // 建立连接
  const coon = connect()
  return new Promise((resolve, reject) => {
    try {
      coon.query(sql, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    } catch (e) {
      console.log(e);
    } finally {
      // 关闭连接
      coon.end()
    }
  })
}

// 查询语句
function querySelect(sql) {
  return new Promise((resolve, reject) => {
    querySql(sql)
    .then(res => {
      if (res.length > 0 || res instanceof Object) {
        // 拿到数据  返回
        resolve(res)
      } else {
        // 没有拿到数据，返回 null
        resolve(null)
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

module.exports = {
  querySelect
}
