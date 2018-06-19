var util = require('../../utils/util.js')

var app = getApp();
var openid = null;

Page({
  data: {
    userInfo: null,
    showTopTips: false,

    date: "1994-01-01",
    nowData: "1994-01-01",

    gender: ["女","男"],
    genderIndex: 0,
    phoneNumber: null

  },
  updateUserInfo: function () {
    var that = this;
    var phoneNumber = this.data.phoneNumber;
    var birthday = this.data.date;
    openid = wx.getStorageSync('openId');
    console.log(phoneNumber)
    if (phoneNumber != '' && util.checkMobile(phoneNumber)){
      //手机号格式正确
      wx.request({
        url: app.globalData.serverAddress + '/updateUserInfo',
        method: "PUT",
        header: {
          'content-type': 'application/json'
        },
        data: { "openId": openid, "phoneNumber": phoneNumber, "birthday": birthday },
        success: function (data) {
          if (data.data.code > 0) {
            wx.showToast({
              title: '修改成功!',
              icon: 'success',
              duration: 3000
            });
          }
        },
        fail: function (data) {
          console.log('更新用户信息失败');
        }
      });
    }else{
      wx.showToast({
        title: '手机号格式不正确!',
        icon: 'none',
        duration: 3000
      });
      console.log('手机号格式不正确')
    }
  },
  onLoad: function(options){
    var that = this;
    var date = this.formatDate(new Date());
    var userInfo = app.globalData.userInfo;
    openid = wx.getStorageSync('openId');
    wx.request({
      url: app.globalData.serverAddress + '/getUserInfo',
      data: { "openId": openid },
      success: function (data) {
        that.setData({
          date: data.data.birthday == "undefined" ? '1994-01-01' : data.data.birthday,
          phoneNumber: data.data.phoneNumber == 'undefined' ? null : data.data.phoneNumber
        })
      },
      fail: function (data) {
        console.log('根据openid获取用户信息失败');
      }
    });
  
    this.setData({
      userInfo: userInfo,
      nowDate: date,
      genderIndex: userInfo.gender
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindGenderChange: function (e) {
    this.setData({
      genderIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  phoneNumberInput(e){
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  formatDate(time){
    var date = new Date(time);
    var year = date.getFullYear(),
    month = date.getMonth() + 1,//月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
    var newTime = year + '-' +
    month + '-' +
    day + ' ' +
    hour + ':' +
    min + ':' +
    sec;
    return newTime;         
  }
});