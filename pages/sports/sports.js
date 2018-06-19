var Charts = require("../../utils/charts.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    charts: {
      area: ["上海,750", "杭州,425", "苏州,960", "南京,700", "广州,800", "厦门,975", "北京,375", "沈阳,775", "泉州,100", "哈尔滨,200", "哈尔滨,200"],
      pieData: [10, 25, 35, 30]
    }
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
    var windowWidth = 0;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        windowWidth = res.windowWidth;
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }
    })

    var pieCharts = new Charts({
      type: "pie",
      data: this.data.charts.pieData,
      colors: ["#7158ec", "#fec312", "#1db2f4", "#ff3444"],
      canvasId: 'canvas1',
      point: {
        x: 100,
        y: 100
      },
      radius: 50
    });
    new Charts({
      type: "ring",
      data: [10, 25, 35, 30],
      colors: ["#7158ec", "#fec312", "#1db2f4", "#ff3444"],
      canvasId: 'canvas2',
      point: {
        x: 100,
        y: 100
      },
      radius: 50
    });
    console.log(this.data.charts.area.length)

    console.log(windowWidth / this.data.charts.area.length)
    new Charts({
      type: 'bar',
      data: this.data.charts.area,
      bgColors: "#46a2ef",
      color: '#383838',
      cHeight: 300,//表格高度
      cWidth: windowWidth - 10,//表格宽度
      bWidth: (windowWidth - 10) / this.data.charts.area.length,//柱子宽度
      bMargin: 16,//柱子间距
      showYAxis: false,//是否显示Y轴
      xCaption: '已成交客户地域分布',
      yCaption: '地域成交数',
      canvasId: 'chartContainer'
    });
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