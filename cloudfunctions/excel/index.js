const cloud = require('wx-server-sdk')
cloud.init({
  env: "cloud1-1g5rpv5n6177b545"
})
const xlsx = require('node-xlsx');

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    let {userdata} = event
    
    //1,定义excel表格名
    let dataCVS = '订餐数据.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = ['宿舍', '订单状态', '到餐日期','下单时间','早餐','午餐A','午餐B','清真午餐','晚餐A','晚餐B','清真晚餐','金额']; //表属性
    alldata.push(row);


    for (let key in userdata ) {
      let arr = [];
      arr.push(userdata[key].address);
      arr.push(userdata[key].state);
      arr.push(userdata[key].info.remark);
      arr.push(userdata[key].time);
      arr.push(userdata[key].info.size);
      arr.push(userdata[key].info.size1);
      arr.push(userdata[key].info.size2);
      arr.push(userdata[key].info.size3);
      arr.push(userdata[key].info.size4);
      arr.push(userdata[key].info.size5);
      arr.push(userdata[key].info.size6);
      arr.push(userdata[key].money);
      alldata.push(arr)
    }
    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "mySheetName",
      data: alldata
    }]);
    //4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
    })

  } catch (e) {
    console.error(e)
    return e
  }
}
