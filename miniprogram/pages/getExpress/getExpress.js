// pages/getExpress/getExpress.js
import { getTimeNow } from '../../utils/index';
const db = wx.cloud.database();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        money:0,
        moneyl15:0,
        moneyd15:0,
        moneyl10:0,
        moneyd10:0,
        moneylqqz:0,
        moneydqqz:0,
        address:'',
        remark:'',
        domt:'',
        userInfo:{},
        typeList: [
            {
                name: '0',
                tips: '真的要睡懒觉不吃早饭嘛🤤（不是的',
                money:0,
                infoname:'早餐——0份'
            },
            {
                name: '1',
                tips: '当前早餐共计6元',
                money:6,
                infoname:'早餐——1份'
            },
            {
                name: '2',
                tips: '当前早餐共计12元',
                money:12,
                infoname:'早餐——2份'
            },
            {
                name: '3',
                tips: '当前早餐共计18元',
                money:18,
                infoname:'早餐——3份'
            },
            {
                name: '4',
                tips: '当前早餐共计24元',
                money:24,
                infoname:'早餐——4份'
            },
        ],
        typeListl15: [
            {
                name: '0',
                tips: '午餐A当前共计0元',
                moneyl15:0,
                infoname:'午餐A——0份'
            },
            {
                name: '1',
                tips: '午餐A当前共计15元',
                moneyl15:15,
                infoname:'午餐A——1份'
            },
            {
                name: '2',
                tips: '午餐A当前共计30元',
                moneyl15:30,
                infoname:'午餐A——2份'
            },
            {
                name: '3',
                tips: '午餐A当前共计45元',
                moneyl15:45,
                infoname:'午餐A——3份'
            },
            {
                name: '4',
                tips: '午餐A当前共计60元',
                moneyl15:60,
                infoname:'午餐A——4份'
            },
        ],
        typeListd15: [
            {
                name: '0',
                tips: '晚餐A价格当前共计0元',
                moneyd15:0,
                infoname:'晚餐A——0份'
            },
            {
                name: '1',
                tips: '晚餐A当前共计15元',
                moneyd15:15,
                infoname:'晚餐A——1份'
            },
            {
                name: '2',
                tips: '晚餐A当前共计30元',
                moneyd15:30,
                infoname:'晚餐A——2份'
            },
            {
                name: '3',
                tips: '晚餐A当前共计45元',
                moneyd15:45,
                infoname:'晚餐A——3份'
            },
            {
                name: '4',
                tips: '晚餐A当前共计60元',
                moneyd15:60,
                infoname:'晚餐A——4份'
            },
        ],
        typeListl10: [
            {
                name: '0',
                tips: '午餐B当前共计0元',
                moneyl10:0,
                infoname:'午餐B——0份'
            },
            {
                name: '1',
                tips: '午餐B当前共计10元',
                moneyl10:10,
                infoname:'午餐B——1份'
            },
            {
                name: '2',
                tips: '午餐B当前共计20元',
                moneyl10:20,
                infoname:'午餐B——2份'
            },
            {
                name: '3',
                tips: '午餐B当前共计30元',
                moneyl10:30,
                infoname:'午餐B——3份'
            },
            {
                name: '4',
                tips: '午餐B当前共计40元',
                moneyl10:40,
                infoname:'午餐B——4份'
            },
        ],
        typeListd10: [
            {
                name: '0',
                tips: '晚餐B当前共计0元',
                moneyd10:0,
                infoname:'晚餐B——0份'
            },
            {
                name: '1',
                tips: '晚餐B当前共计10元',
                moneyd10:10,
                infoname:'晚餐B——1份'
            },
            {
                name: '2',
                tips: '晚餐B当前共计20元',
                moneyd10:20,
                infoname:'晚餐B——2份'
            },
            {
                name: '3',
                tips: '晚餐B当前共计30元',
                moneyd10:30,
                infoname:'晚餐B——3份'
            },
            {
                name: '4',
                tips: '晚餐B当前共计40元',
                moneyd10:40,
                infoname:'晚餐B——4份'
            },
        ],
        typeListlqqz: [
            {
                name: '0',
                tips: '清真午餐当前共计...你没选哈哈哈（虚晃一枪',
                moneylqqz:0,
                infoname:'清真午——0份'
            },
            {
                name: '1',
                tips: '清真午餐价当前共计15元,由于清真配餐运量有限，请慎重下单',
                moneylqqz:15,
                infoname:'清真午——1份'
            },
            {
                name: '2',
                tips: '清真午餐当前共计30元，由于清真配餐运量有限，请慎重下单',
                moneylqqz:30,
                infoname:'清真午——2份'
            },
            {
                name: '3',
                tips: '清真午餐当前共计5元，由于清真配餐运量有限，请慎重下单',
                moneylqqz:45,
                infoname:'清真午——3份'
            },
            {
                name: '4',
                tips: '清真午餐当前共计60元，由于清真配餐运量有限，请慎重下单',
                moneylqqz:60,
                infoname:'清真午——4份'
            
            },
            
            
        ],
        typeListdqqz: [
            {
                name: '0',
                tips: '清真晚餐当前共计0元',
                moneydqqz:0,
                infoname:'清真晚——0份'
            },
            {
                name: '1',
                tips: '清真晚餐当前共计15元,由于清真配餐运量有限，请慎重下单',
                moneydqqz:15,
                infoname:'清真晚——1份'
            },
            {
                name: '2',
                tips: '清真晚餐当前共计30元，由于清真配餐运量有限，请慎重下单',
                moneydqqz:30,
                infoname:'清真晚——2份'
            },
            {
                name: '3',
                tips: '清真晚餐当前共计45元，由于清真配餐运量有限，请慎重下单',
                moneydqqz:45,
                infoname:'清真晚——3份'
            },
            {
                name: '4',
                tips: '清真晚餐当前共计60元，由于清真配餐运量有限，请慎重下单',
                moneydqqz:60,
                infoname:'清真晚——4份'
            },

            
            
        ],
        
        typeNow: '真的要睡懒觉不吃早饭嘛🤤（不是的',
        typeNowl15: '午餐A当前共计0元',
        typeNowd15: '晚餐A价格当前共计0元',
        typeNowl10: '午餐B当前共计0元',
        typeNowd10: '晚餐B当前共计0元',
        typeNowlqqz: '清真午餐当前共计...你没选哈哈哈（虚晃一枪',
        typeNowdqqz: '清真晚餐当前共计0元',
        showMore: false,
        isReward: false,
        typeNowinfo: 0,
        typeNowinfol15: 0,
        typeNowinfod15: 0,
        typeNowinfol10: 0,
        typeNowinfod10: 0,
        typeNowinfolqqz: 0,
        typeNowinfodqqz: 0,

    },
    selectAddress() {
        wx.navigateTo({
          url: '../address/address',
        })
        wx.setStorageSync('url', 'getExpress');
    },

    handleChangeReward(e) {
        const value = e.detail.value;
        console.log(e)
        this.setData({
            isReward: value
        })
    },

    showMore() {
        this.setData({
            showMore: !this.data.showMore
        })
    },
    getRemark(e) {
        this.setData({
            remark: e.detail.value
        })
    },
    selectType(e) {
        const { id, tip,idx }  = e.currentTarget.dataset;
        console.log(e)
        this.setData({
            typeNow: id,
            typeNowinfo:idx,
            money:this.data.typeList[idx].money
        })
        wx.showToast({
          icon: 'none',
          title: tip,
        })
    },
    selectType1(e) {
        const { id, tip, idx }  = e.currentTarget.dataset;
        console.log(e)
        this.setData({
            typeNowl15: id,
            typeNowinfol15:idx,
            moneyl15:this.data.typeListl15[idx].moneyl15
        })
        wx.showToast({
          icon: 'none',
          title: tip,
        })
    },
    selectType2(e) {
        const { id, tip ,idx}  = e.currentTarget.dataset;
        console.log(e)
        this.setData({
            typeNowl10: id,
            typeNowinfol10:idx,
            moneyl10:this.data.typeListl10[idx].moneyl10
        })
        wx.showToast({
          icon: 'none',
          title: tip,
        })
    },
    selectType3(e) {
        const { id, tip , idx }  = e.currentTarget.dataset;
        console.log(e)
        this.setData({
            typeNowlqqz: id,
            typeNowinfolqqz:idx,
            moneylqqz:this.data.typeListlqqz[idx].moneylqqz
        })
        wx.showToast({
          icon: 'none',
          title: tip,
        })
    },
    selectType4(e) {
        const { id, tip ,idx }  = e.currentTarget.dataset;
        console.log(e)
        this.setData({
            typeNowd15: id,
            typeNowinfod15:idx,
            moneyd15:this.data.typeListd15[idx].moneyd15
        })
        wx.showToast({
          icon: 'none',
          title: tip,
        })
    },
    selectType5(e) {
        const { id, tip,idx }  = e.currentTarget.dataset;
        console.log(e)
        this.setData({
            typeNowd10: id,
            typeNowinfod10:idx,
            moneyd10:this.data.typeListd10[idx].moneyd10
        })
        wx.showToast({
          icon: 'none',
          title: tip,
        })
    },
    selectType6(e) {
        const { id, tip ,idx}  = e.currentTarget.dataset;
        console.log(e)
        this.setData({
            typeNowdqqz: id,
            typeNowinfodqqz:idx,
            moneydqqz:this.data.typeListdqqz[idx].moneydqqz
        })
        wx.showToast({
          icon: 'none',
          title: tip,
        })
    },
    // inputdate:function(e){
    //     this.setData({
    //         remark:e.detail.value
    //     })
    //     console.log(this.data.remark)
    // },
    submit() {
        // 保存this指向
        const that = this.data;

        // 判断必填值有没有填
        // 收件地址、快递单家、收件码或者截图
        if (!that.address) {
            wx.showToast({
              icon: 'none',
              title: '还没有选择宿舍哦🥺',
            })
            return;
        } 

        if (that.remark == '') {
            wx.showToast({
              icon: 'none',
              title: '还没有填写订的是几号的饭哦🥺',
            })
            return;
        }
        db.collection('order').add({
            data: {
                // 模块的名字
                name: '订餐需求',
                // 当前时间
                time: getTimeNow(),
                // 订单金额
                money: that.money+that.moneyl15+that.moneyd15+that.moneyl10+that.moneyd10+that.moneylqqz+that.moneydqqz,
                // 订单状态
                state: '待配送',
                // 收件地址
                address: that.address,
                // 订单信息
                info: {
                    //  快递大小
                    size: that.typeList[that.typeNowinfo].name,
                    size1: that.typeListl15[that.typeNowinfol15].name,
                    size2: that.typeListl10[that.typeNowinfol10].name,
                    size3: that.typeListlqqz[that.typeNowinfolqqz].name,
                    size4: that.typeListd15[that.typeNowinfod15].name,
                    size5: that.typeListd10[that.typeNowinfod10].name,
                    size6: that.typeListdqqz[that.typeNowinfodqqz].name,
                    // // 快递商家
                    // business: that.business,
                    // // 取件码
                    // expressCode: that.expressCode,
                    // // 取件码截图
                    // codeImg: that.codeImg,
                    // 备注
                    remark: that.remark,
                    // // 期望送达
                    // expectTime: that.arriveArray[that.arriveIndex],
                    // // 性别限制
                    // expectGender: that.genderArray[that.genderIndex],
                    // // 快递数量
                    // number: that.numArray[that.numIndex],
                },
                userInfo:that.userInfo,
                createTime: db.serverDate()
            },
            success: (res) => {
                wx.showToast({
                  icon:'success',
                  title: '发布成功😋',
                  success: () => {
                    wx.switchTab({
                        url: '../index/index',
                      })
                  }
                })

            },
            fail:(res) => {
                wx.showToast({
                  title: '订餐失败，请检查一下网络🥺',
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const address = wx.getStorageSync('addressNow');
        const userInfo = wx.getStorageSync('userInfo')
        if (address) {
            const { build, houseNumber } = address;
            this.setData({
                address: `${build}-${houseNumber}`
            })
        } 
        this.setData({
            userInfo: userInfo,
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