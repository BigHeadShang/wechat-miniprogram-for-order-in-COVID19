// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'cloud1-1g5rpv5n6177b545',
    traceUser: true,
})
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    const { state,  examinePerson, _id} = event;
    db.collection('orderReceive').doc(_id).update({
        data:{
            examinePerson,
            state
        }
    })
}