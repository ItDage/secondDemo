//index.js
//获取应用实例
const app = getApp()

var base64 = require("../../images/base64");
var pageNum = 0;
var totalData = 0;
Page({
  data: {
    articleList: "",
    imgUrls: [//轮播图
      '../../images/scroll02.jpg',
      '../../images/scroll03.jpg',
      '../../images/scroll01.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    nomore: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
   console.log("us" + app.globalData.isRefreshIndex)
    var that = this;

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.request({
      url: app.globalData.serverAddress + '/article/get',
      data: {
        "pageNum": pageNum
      },
      success: function (data) {
        app.globalData.articleList = data.data.data;
        totalData = data.data.code;

        that.setData({
          icon20: base64.icon20,
          icon60: base64.icon60,
          articleList: app.globalData.articleList
        });
      }
    })

    if (!this.data.hasUserInfo && this.data.canIUse) {
      wx.hideTabBar();
    } else {
      wx.showTabBar();
    }

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.showTabBar();
  },
  searchScrollLower: function (e) {

  },
  onReachBottom: function () {
    var that = this;
    ++pageNum;
    wx.request({
      url: app.globalData.serverAddress + '/article/get',
      data: {
        "pageNum": pageNum
      },
      success: function (data) {
        totalData = data.data.code;
        var moreArticle = data.data.data;
        for (var i = 0; i < moreArticle.length; i++) {
          app.globalData.articleList.push(moreArticle[i])
        }
        if (app.globalData.articleList.length == totalData) {
          //加载了全部
          that.setData({
            nomore: true
          })
        } else {
          wx.showToast({
            title: '正在加载',
            icon: 'loading',
            duration: 2000
          })
        }
        that.setData({
          articleList: app.globalData.articleList
        })
      }
    })
  },
  addArticle: function () {
    wx.navigateTo({
      url: '../addArticle/addArticle'
    })
  },
  onPullDownRefresh: function () {
    var that = this;
    wx.stopPullDownRefresh();
    pageNum = 0;
    that.setData({
      nomore: false
    })
    wx.request({
      url: app.globalData.serverAddress + '/article/get',
      data: {
        "pageNum": 0
      },
      success: function (data) {
        app.globalData.articleList = data.data.data;
        totalData = data.data.code;
        that.setData({
          icon20: base64.icon20,
          icon60: base64.icon60,
          articleList: app.globalData.articleList
        });
        wx.showToast({
          title: '刷新成功!',
          icon: 'success',
          duration: 1500
        });
      }
    })
  }
})
