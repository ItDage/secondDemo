var Charts = require("../../utils/charts.js");
var app = getApp();
var openId = wx.getStorageSync('openId');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      area: ["上海,750", "杭州,425", "苏州,960", "南京,700", "广州,800", "厦门,975", "北京,375", "沈阳,775", "泉州,100", "哈尔滨,200", "哈尔滨,200"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var width = 0;
    wx.getSystemInfo({
      success: function (res) {
        width = res.windowWidth;
        console.log(res.windowWidth)
      }
    })
    wx.getWeRunData({
      success(res) {
        console.log(res.encryptedData);
        console.log(res.iv);
        wx.request({
          url: app.globalData.serverAddress + '/sports/getSteps',
          data: {
            encryptedData: res.encryptedData,
            iv: res.iv,
            openId: openId
          },
          method: "POST",
          success: function (data) {
            var stepData = [];
            for(var i = 0; i < data.data.data.length; i++){
              stepData.push(that.timestampToTime(data.data.data[i].timestamp) + "," + data.data.data[i].step)
            }
            that.setData({
              area:stepData
            })
            new Charts({
              type: 'bar',
              data: that.data.area,
              bgColors: "#46a2ef",
              color: '#383838',
              cHeight: 300,//表格高度
              cWidth: width,//表格宽度
              bWidth: 12,//柱子宽度
              bMargin: width / 14,//柱子间距
              showYAxis: false,//是否显示Y轴
              xCaption: '近九天微信步数柱状图',
              yCaption: '步数',
              canvasId: 'chartContainer'
            });
            console.log(stepData);
          }
        })
      }
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
    
  },
  timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return M + D;
  }
})