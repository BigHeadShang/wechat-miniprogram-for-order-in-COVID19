// pages/upMenu/upMenu.js
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:'',
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        name6: '',
        name7: '',
        name8: '',
        name9: '',
        name10: '',
        name11: '',
        name12: '',
        name13: '',
        name14: '',
        name15: '',
        name16: '',
        name17: '',
        name18: '',
        name19: '',
        name20: '',
    },
    getName(e) {
        this.setData({
            name: e.detail.value,
        })
    },
    getName1(e) {
        this.setData({
            name1: e.detail.value,
        })
    },
    getName2(e) {
        this.setData({
            name2: e.detail.value,
        })
    },
    getName3(e) {
        this.setData({
            name3: e.detail.value,
        })
    },
    getName4(e) {
        this.setData({
            name4: e.detail.value,
        })
    },


    getName1l15(e) {
        this.setData({
            name5: e.detail.value,
        })
    },
    getName2l15(e) {
        this.setData({
            name6: e.detail.value,

        })
    },
    getName3l15(e) {
        this.setData({
            name7: e.detail.value,
        })
    },
    getName4l15(e) {
        this.setData({
            name8: e.detail.value,
        })
    },

    getName1l10(e) {
        this.setData({
            name9: e.detail.value,

        })
    },
    getName2l10(e) {
        this.setData({

            name10: e.detail.value,

        })
    },
    getName3l10(e) {
        this.setData({

            name11: e.detail.value,

        })
    },
    getName4l10(e) {
        this.setData({

            name12: e.detail.value,
        })
    },

    getName4d15(e) {
        this.setData({

            name16: e.detail.value,
        })
    },
    getName1d15(e) {
        this.setData({
            name13: e.detail.value,

        })
    },
    getName2d15(e) {
        this.setData({

            name14: e.detail.value,

        })
    },
    getName3d15(e) {
        this.setData({

            name15: e.detail.value,

        })
    },
    getName1d10(e) {
        this.setData({
            name17: e.detail.value,

        })
    },
    getName2d10(e) {
        this.setData({

            name18: e.detail.value,

        })
    },
    getName3d10(e) {
        this.setData({

            name19: e.detail.value,

        })
    },
    getName4d10(e) {
        this.setData({

            name20: e.detail.value,
        })
    },


    submit() {
        console.log(this.data.name);

        // 提交数据到数据库
        db.collection("menu").add({
            data: {
                name: this.data.name,
                name1: this.data.name1,
                name2: this.data.name2,
                name3: this.data.name3,
                name4: this.data.name4,
                name5: this.data.name5,
                name6: this.data.name6,
                name7: this.data.name7,
                name8: this.data.name8,
                name9: this.data.name9,
                name10: this.data.name10,
                name11: this.data.name11,
                name12: this.data.name12,
                name13: this.data.name13,
                name14: this.data.name14,
                name15: this.data.name15,
                name16: this.data.name16,
                name17: this.data.name17,
                name18: this.data.name18,
                name19: this.data.name19,
                name20: this.data.name20,

            },
            success: (res) => {
                // 上传成功
                console.log(res);
                wx.showToast({
                  title: '提交成功',
                })
            },
            fail: (err) => {
                // 上传失败
                console.log(err);
            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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