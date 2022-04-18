Page({
    data:{
        fileUrl:'',
        userdata:'',
        fileList:'',

    },
  onLoad: function(options) {
    let that = this;
    //读取users表数据
    wx.cloud.callFunction({
      name: "getUsers",
      success(res) {
        console.log(res)
        // console.log("读取成功", res.result.data)
        that.savaExcel(res.result.data)
      },
      fail(res) {
        console.log("读取失败", res)
      }
    })
  },

  //把数据保存到excel里，并把excel保存到云存储
  savaExcel(userdata) {
    let that = this
    wx.cloud.callFunction({
      name: "excel",
      data: {
        userdata: userdata
      },
      success(res) {
        console.log("保存成功", res)
        that.getFileUrl(res.result.fileID)
      },
      fail(res) {
        console.log("保存失败", res)
      }
    })
  },

  //获取云存储文件下载地址，这个地址有效期一天
  getFileUrl(fileID) {
    let that = this;
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: res => {
        // get temp file URL
        console.log("文件下载链接", res.fileList[0].tempFileURL)
        that.setData({
          fileUrl: res.fileList[0].tempFileURL
        })
      },
      fail: err => {
        // handle error
      }
    })
  },
  //复制excel文件下载链接
  copyFileUrl() {
    let that=this
    console.log(that.data.fileUrl)
    wx.setClipboardData({
      data: that.data.fileUrl,
      success(res) {
        console.log("下载链接复制成功",res.data)
        wx.showToast({
          title: '下载链接已复制',
        }) // data

      },
      fail: (err) => {
        console.log(err);
    }
    })
  }
})