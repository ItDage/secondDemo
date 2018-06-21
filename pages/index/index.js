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
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    nomore: false,
    scrollHeight: 0, //上滑区域
    scrollTop: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;

    if (app.globalData.userInfo) {
      console.log("test1")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      console.log("test3")
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
        console.log(this.data.hasUserInfo)
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

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    wx.request({
      url: app.globalData.serverAddress + '/article/get',
      data: {
        "pageNum": pageNum
      },
      success:function(data){
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
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
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
        var moreArticle= data.data.data;
        for (var i = 0; i < moreArticle.length; i++) {
          app.globalData.articleList.push(moreArticle[i])
        }
        if(app.globalData.articleList.length == totalData){
          //加载了全部
          that.setData({
            nomore: true
          })
        }else{
          wx.showToast({
          title: '正在加载',
          icon: 'loading',
          duration: 2000
        })
          that.setData({
            articleList: app.globalData.articleList
          })
        }
       
      }
    })
  },
  addArticle: function(){
    wx.navigateTo({
      url: '../addArticle/addArticle'
    })
  },
  onPullDownRefresh: function () {
    var that = this;
    wx.stopPullDownRefresh();
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
  }
})
