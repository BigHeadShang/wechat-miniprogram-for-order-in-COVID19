// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'cloud1-1g5rpv5n6177b545',
    traceUser: true,
})
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    const{ time } = event;
    try {
      return await db.collection('order').where({
        time: db.RegExp({
          regexp: time,
          options: 'i'
        })
      }).get();
    } catch (error) {
      console.log(error);
      return 'fail';
    }
}