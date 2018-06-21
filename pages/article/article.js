const app = getApp()
var WxParse = require('../wxParse/wxParse.js');
Page({
  data: {
    title: null,
    content: null,
    icon: "gjbz.jpg",
    author: null
  },
  onLoad: function (options) {
    var that = this;
    var articleObject = app.globalData.articleList.find((value, index, arr) => {
      return app.globalData.articleList[index].id == options.articleId;
    })
    WxParse.wxParse('article', 'html', articleObject.content, that, 5);
    this.setData({
      title: articleObject.title,
      content: articleObject.content,
      icon: articleObject.icon,
      author: articleObject.author
    })
  }
});