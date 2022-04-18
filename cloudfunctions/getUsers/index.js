const cloud = require('wx-server-sdk')
cloud.init({
  env: "cloud1-1g5rpv5n6177b545"
})
// 云函数入口函数
exports.main = async(event, context) => {
  return await cloud.database().collection('order').get();
}