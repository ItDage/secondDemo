const app = getApp()

Page({
  data:{
    title: null,
    content: null,
    icon: "gjbz.jpg"
  },
  onLoad: function (options){
    var articleObject = app.globalData.articleList[options.articleId - 1]
    this.setData({
      title: articleObject.title,
      content: articleObject.content,
      icon: articleObject.icon
    })
  }
});