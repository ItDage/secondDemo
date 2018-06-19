//index.js
//获取应用实例
const app = getApp()

var base64 = require("../../images/base64");
var hasmore = true;

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
        console.log("test4")
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
        console.log(this.data.hasUserInfo)
    } else {
      console.log("test2")
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

    app.globalData.articleList = [
      {
        "id": 1,
        "icon": 'gjbz.jpg',
        "title": "文章一",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 2,
        "icon": "lsxq.jpg",
        "title": "文章二",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 3,
        "icon": 'gjbz.jpg',
        "title": "文章三",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 4,
        "icon": "lsxq.jpg",
        "title": "文章四",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 5,
        "icon": 'gjbz.jpg',
        "title": "文章五",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      },
      {
        "id": 6,
        "icon": 'gjbz.jpg',
        "title": "文章七",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      },
      {
        "id": 7,
        "icon": 'gjbz.jpg',
        "title": "文章七",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 8,
        "icon": "lsxq.jpg",
        "title": "文章八",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 9,
        "icon": 'gjbz.jpg',
        "title": "文章九",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 10,
        "icon": "lsxq.jpg",
        "title": "文章十",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 11,
        "icon": 'gjbz.jpg',
        "title": "文章十一",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 12,
        "icon": "lsxq.jpg",
        "title": "文章十二",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }];


    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60,
      articleList: app.globalData.articleList
    });

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
    console.log('loading')

    var moreArticle = [
      {
        "id": 13,
        "icon": 'gjbz.jpg',
        "title": "文章七",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 14,
        "icon": "lsxq.jpg",
        "title": "文章八",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 15,
        "icon": 'gjbz.jpg',
        "title": "文章九",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 16,
        "icon": "lsxq.jpg",
        "title": "文章十",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 17,
        "icon": 'gjbz.jpg',
        "title": "文章十一",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 18,
        "icon": "lsxq.jpg",
        "title": "文章十二",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      },
      {
        "id": 19,
        "icon": 'gjbz.jpg',
        "title": "文章七",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 20,
        "icon": "lsxq.jpg",
        "title": "文章八",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 21,
        "icon": 'gjbz.jpg',
        "title": "文章九",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 22,
        "icon": "lsxq.jpg",
        "title": "文章十",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 23,
        "icon": 'gjbz.jpg',
        "title": "文章十一",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }, {
        "id": 24,
        "icon": "lsxq.jpg",
        "title": "文章十二",
        "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
      }];
    for (var i = 0; i < moreArticle.length; i++) {
      app.globalData.articleList.push(moreArticle[i])
    }
    var nomore = this.data.nomore;
    if (!nomore && hasmore == true) {
      hasmore = false;
      this.setData({
        articleList: app.globalData.articleList
      })
      setTimeout(function () {
        hasmore = true;
      }, 1000)
      if (app.globalData.articleList.length == 36) {
        this.setData({
          nomore: true
        })
      } else {
        wx.showToast({
          title: '正在加载',
          icon: 'loading',
          duration: 2000
        })
      }
    }
  }
})
