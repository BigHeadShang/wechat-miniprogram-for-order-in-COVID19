Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:['../../images/7.png','../../images/8.jpg'],
    indexConfig:[
      {
        icon:'../../images/1.jpg',
        text:'每日菜单',
        url:'../menu/menu'
      },
      {
        icon:'../../images/2.jpg',
        text:'订餐须知',
        url:'../agreement/agreement'
      },
      {
        icon:'../../images/3.jpg',
        text:'开始订餐',
        url:'../getExpress/getExpress'
      },
      {
        icon:'../../images/4.jpg',
        text:'意见反馈',
        url:'../require/require'
      }
    ]
  },
  toDetail(e) {
    const userInfo = wx.getStorageSync('userInfo');
    const url = e.currentTarget.dataset.url;
    if (userInfo) {
      wx.navigateTo({
        url,
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请前往个人中心登录',
      })
    }
  },
  handleClickNotice () {
    wx.showModal({
      title: '公告',
      content: '请按时订饭！'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const openid = wx.getStorageSync('openid');
    if (!openid) {
      wx.cloud.callFunction({
        name: 'UserOpenId',
        success: (res) => {
          const { openid } = res.result;
          wx.setStorageSync('openid', openid);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})