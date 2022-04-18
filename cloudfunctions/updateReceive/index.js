// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'cloud1-1g5rpv5n6177b545',
    traceUser: true,
})
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    const{_id,receivePerson,state} = event;
    db.collection('order').doc(_id).update({
        data:{
            receivePerson,
            state
        }
    })
}