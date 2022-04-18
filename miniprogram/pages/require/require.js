const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        userask: '',
        userImg:'',

    },

    submit() {
        const that = this.data;
        // 提交信息
        db.collection('askReceive').add({
            data:{
                userask:that.userask,
                userImg:that.userImg,
                userInfo:that.userInfo,
                state:'待回复',
            },
            success:(res) => {
                this.setData({
                    userask:'',
                    userImg:'',
                })
                wx.showToast({
                  title: '提交成功',
                })
                wx.navigateTo({
                  url: '../index/index',
                })
            },
            fail:(res) => {
                wx.showToast({
                  icon:'none',            
                  title: '吐槽失败',
        
                })
            },

        })
    },
    getUserASK(e) {
        this.setData({
            userask: e.detail.value
        })
    },
    getAdminWX() {
        wx.setClipboardData({
            data: '18901997168',
            success: (res) => {
                wx.showToast({
                    title: '复制微信成功',
                })
            }
        })
    },
    uploadImg() {
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed', 'original'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                wx.showLoading({
                    title: '加载中',
                })
                const random = Math.floor(Math.random() * 1000);
                wx.cloud.uploadFile({
                    cloudPath: `userImg/${this.data.userInfo.nickName}-${random}.png`,
                    filePath: res.tempFilePaths[0],
                    success: (res) => {
                        let fileID = res.fileID;
                        this.setData({
                            userIDImg: fileID,
                        })
                        wx.hideLoading()
                    }
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const userInfo = wx.getStorageSync('userInfo');
        this.setData({
            userInfo,
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