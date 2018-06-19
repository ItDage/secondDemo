var url = "http://www.imooc.com/course/ajaxlist";
var page = 0;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;


// 请求数据
var loadMore = function (that) {
  // that.setData({
  //   hidden: false
  // });
  // wx.request({
  //   url: url,
  //   data: {
  //     page: page,
  //     page_size: page_size,
  //     sort: sort,
  //     is_easy: is_easy,
  //     lange_id: lange_id,
  //     pos_id: pos_id,
  //     unlearn: unlearn
  //   },
  //   success: function (res) {
  //     //console.info(that.data.list);
  //     var list = that.data.list;
  //     for (var i = 0; i < res.data.list.length; i++) {
  //       list.push(res.data.list[i]);
  //     }
  //     that.setData({
  //       list: list
  //     });
  //     page++;
  //     that.setData({
  //       hidden: true
  //     });
  //   }
  // });
  var temArray = [{
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
  }, {
    "id": 6,
    "icon": "lsxq.jpg",
    "title": "文章六",
    "content": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道"
  }];
  that.data.list = temArray.concat(that.data.list);
  that.setData({
    list: that.data.list,
    hidden: true
  })
  
}
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0
  },
  onLoad: function () {
    //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    loadMore(that);
    console.log(this.data.list)
  },
  //页面滑动到底部
  bindDownLoad: function () {
    var that = this;
    loadMore(that);
    console.log("lower");
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  topLoad: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    loadMore(this);
    console.log("lower");
  }
})