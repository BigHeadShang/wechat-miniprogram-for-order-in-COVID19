// pages/order/order.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['全部订餐', '我的订餐', '我完成的'],
    tabNow: 0,
    orderList: [],
    myOrder: [],
    rewardOrder: [],
    helpOrder: [],
    openid: '',
    canReceive: false,
    helpTotalNum: 0,
    helpTotalMoeny: 0
  },
  selectTab(e) {
    const {
      id
    } = e.currentTarget.dataset;
    this.setData({
      tabNow: id,
    })
    if (id === 0) {
      this.onLoad();
    } else if (id === 1) {
      this.getMyOrder();
    } else if (id === 2) {
      this.getMyHelpOrder();
    } 
  },
  deleteOrder(e){
    const {id} = e.currentTarget.dataset;
    wx.cloud.callFunction({
      name:'deleteOrder',
      data:{
        _id:id
      },
      success:() => {
        wx.showToast({
          title: '删除成功',
          success:(res) =>{}
        })
        this.getMyOrder();
        wx.hideLoading();
      },
      fail:() => {
        wx.showToast({
          icon:'none',
          title: '删除失败',
        })
        wx.hideLoading();
      }
    })
  },
//   callPhone(e) {
//     const { phone } = e.currentTarget.dataset;
//     wx.makePhoneCall({
//       phoneNumber: phone,
//     })
//   },
  // 获取我帮助的订单信息 
  getMyHelpOrder() {
    wx.showLoading({
      title: '加载中',
    })
    db.collection('order').orderBy('createTime', 'desc').where({
      receivePerson: this.data.openid,
      state: '已配送完成',
    }).get({
      success: (res) => {
        console.log(res);
        const {
          data
        } = res;
        data.forEach(item => {
          // item.info = this.formatInfo(item);
          item.stateColor = this.formatState(item.state);
        });
        this.setData({
          helpOrder: data,
        })
        wx.hideLoading();
      }
    })
  },
  getHelpTotalNum() {
    db.collection('order').where({
      receivePerson: wx.getStorageSync('openid'),
      state: '已配送完成'
    }).count({
      success: (res) => {
        console.log(res);
        this.setData({
          helpTotalNum: res.total
        })
      }
    })
  },

  // 我帮助的订单金额总和
  getHelpTotalMoney() {
    const $ = db.command.aggregate;
    db.collection('order').aggregate().match({
      receivePerson: wx.getStorageSync('openid'),
      state: '已配送完成',
    }).group({
      _id: null,
      totalNum: $.sum('$money'),
    }).end({
      success: (res) => {
        console.log(res);
        this.setData({
          helpTotalMoeny: res.list[0].totalNum
        })
      }
    })
  },

  // 获取正在悬赏的订单信息
  getRewardOrder() {
    wx.showLoading({
      title: '加载中',
    })
    db.collection('order').where({
      state: '待配送'
    }).get({
      success: (res) => {
        const {
          data
        } = res;
        data.forEach(item => {
          // item.info = this.formatInfo(item);
          item.stateColor = this.formatState(item.state);
        });
        this.setData({
          rewardOrder: data,
        })
        wx.hideLoading();
      }
    })
  },

  // 获取我的订单信息
  getMyOrder() {
    wx.showLoading({
      title: '加载中',
    })
    db.collection('order').orderBy('createTime', 'desc').where({
      _openid: this.data.openid
    }).get({
      success: (res) => {
        const {
          data
        } = res;
        data.forEach(item => {
          // item.info = this.formatInfo(item);
          item.stateColor = this.formatState(item.state);
        });
        this.setData({
          myOrder: data,
        })
        wx.hideLoading();
      }
    })
  },

  // 点击接单
  orderReceive(e) {
    if (this.data.canReceive) {
      wx.showLoading({
        title: '加载中',
      })
      const {
        item
      } = e.currentTarget.dataset;
      const {
        _id
      } = item;
      wx.cloud.callFunction({
          name:'updateReceive',
          data:{
              _id,
              receivePerson:this.data.openid,
              state:'已上报'
          },
          success: (res) => {
            if (this.data.tabNow === 0) {
              this.onLoad();
            } else {
              this.getRewardOrder();
            }
            wx.hideLoading();
          },
          fail: (err) => {
            console.log(err);
          }

      })
      // db.collection('order').doc(_id).update({
      //   data: {
      //     receivePerson: this.data.openid,
      //     state: '已送达宿舍',
      //   },
      //   success: (res) => {
      //     if (this.data.tabNow === 0) {
      //       this.onLoad();
      //     } else {
      //       this.getRewardOrder();
      //     }
      //     wx.hideLoading();
      //   },
      // })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '您目前不是志愿者, 若想为宿舍楼贡献自己的力量请先去我的界面中成为志愿者'
      })
    }

  },

  toFinish(e) {
    wx.showLoading({
      title: '加载中',
    })
    const {
      item
    } = e.currentTarget.dataset;
    const {
      _id
    } = item;
    db.collection('order').doc(_id).update({
      data: {
        state: '已配送完成'
      },
      success: (res) => {
        this.getMyOrder();
        wx.hideLoading();
      }
    })
  },

  formatInfo(orderInfo) {
    const {
      name,
      info,
    } = orderInfo;
    if (name === '订餐需求') {
      const {
        remark,
        size,
        size1,
        size2,
        size3,
        size4,
        size5,
        size6
      } = info;
      return `0️⃣ 早餐: ${size}份 1️⃣ 午餐A: ${size1}份 2️⃣ 午餐B: ${size2}份 3️⃣ 清真午餐: ${size3}份 4️⃣ 晚餐A: ${size4}份 5️⃣ 晚餐B: ${size5}份 6️⃣ 清真晚餐: ${size6}份 7️⃣ 备注: ${remark}`;
    } 
  },

  formatState(state) {
    if (state === '待配送') {
      return 'top_right';
    } else if (state === '已上报') {
      return 'top_right_help';
    } else if (state === '已配送完成') {
      return 'top_right_finish';
    }
  },

  getPersonPower() {
    db.collection('orderReceive').where({
        state: "通过",
        _openid: wx.getStorageSync('openid')
    }).get({
        success: (res) => {
            console.log(res);
            this.setData({
                canReceive: !!res.data.length
            })
        }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 删除指定数据
    // db.collection('集合名字').doc('要删除数据的_id').remove();
    // wx.cloud.callFunction({
    //   name: 'delete',
    //   data: {
    //     time: '2022-4-15'
    //   },
    //   success: (res) => {
    //     console.log(res);
    //     res.result.data.forEach(item => {
    //       wx.cloud.callFunction({
    //         name: 'deleteOrder',
    //         data: {
    //           _id: item._id
    //         }
    //       })
    //     })
    //     console.log('删除完毕!');
    //   }
    // })

    wx.showLoading({
      title: '加载中',
    })
    this.getPersonPower();
    db.collection('order').orderBy('createTime', 'desc').get({
      success: (res) => {
        const {
          data
        } = res;
        console.log(data);
        data.forEach(item => {
          // item.info = this.formatInfo(item);
          item.stateColor = this.formatState(item.state);
        });
        this.setData({
          orderList: data,
          openid: wx.getStorageSync('openid')
        })
        wx.hideLoading();
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '服务器异常🥺',
        })
        wx.hideLoading();
      }
    })
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
    this.onLoad();
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
    wx.showLoading({
      title: '加载中',
    })
    let {
      orderList,
      myOrder,
      rewardOrder,
      helpOrder,
      tabNow,
      openid
    } = this.data;

    if (tabNow === 0) {
      db.collection('order').skip(orderList.length).orderBy('createTime', 'desc').get({

        success: (res) => {
          if (res.data.length) {
            res.data.forEach(item => {
              // item.info = this.formatInfo(item);
              item.stateColor = this.formatState(item.state);
              orderList.push(item);
            })
            this.setData({
              orderList,
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '无更多信息',
            })
          }
          wx.hideLoading();
        },
        fail: (error) => {
          wx.showToast({
            icon: 'none',
            title: '服务器出错🥺',
          })
          wx.hideLoading();
        }
      })
    } else if (tabNow === 1) {
      db.collection('order').skip(myOrder.length).orderBy('createTime', 'desc').where({
        _openid: openid
      }).get({
        success: (res) => {
          if (res.data.length) {
            const {
              data
            } = res;
            data.forEach(item => {
              // item.info = this.formatInfo(item);
              item.stateColor = this.formatState(item.state);
              myOrder.push(item);
            });
            this.setData({
              myOrder,
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '无更多信息',
            })
          }
          wx.hideLoading();
        }
      })
    } else if (tabNow === 2) {
      db.collection('order').skip(helpOrder.length).orderBy('createTime', 'desc').where({
        receivePerson: this.data.openid
      }).get({
        success: (res) => {
          if (res.data.length) {
            const {
              data
            } = res;
            data.forEach(item => {
              // item.info = this.formatInfo(item);
              item.stateColor = this.formatState(item.state);
              helpOrder.push(item);
            });
            this.setData({
              helpOrder,
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '无更多信息',
            })
          }
          wx.hideLoading();
        }
      })
    } else if (tabNow === 3) {
      db.collection('order').skip(rewardOrder.length).orderBy('createTime', 'desc').where({
        state: '待配送'
      }).get({
        success: (res) => {
          if (res.data.length) {
            const {
              data
            } = res;
            data.forEach(item => {
              // item.info = this.formatInfo(item);
              item.stateColor = this.formatState(item.state);
              rewardOrder.push(item);
            });
            this.setData({
              rewardOrder,
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '无更多信息',
            })
          }
          wx.hideLoading();
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})