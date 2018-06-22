var app = getApp();
var typeJson = {};
Page({
  data: {
    showTopTips: false,

    radioItems: [
      { name: 'cell standard', value: '0' },
      { name: 'cell standard', value: '1', checked: true }
    ],
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],

    date: "2016-09-01",
    time: "12:01",

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    countries: ["中国", "美国", "英国"],
    countryIndex: 0,

    accounts: ["亲情"],
    accountIndex: 0,

    isAgree: false
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.globalData.serverAddress + '/articleType/getAll',
      success: function (data) {
        var accounts = [];
        data.data.data.forEach(function (e) {
          typeJson[e.type] = e.id;
          accounts.push(e.type);
        });
        that.setData({
          accounts: accounts
        })
      }
    })
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this;
    var openid = wx.getStorageSync('openId');
    var data = e.detail.value;
    data['openId'] = openid;
    console.log(this.data.accounts[this.data.accountIndex]);
    data['type'] = typeJson[this.data.accounts[this.data.accountIndex]];

    wx.request({
      url: app.globalData.serverAddress + '/article/add',
      method: "POST",
      data: data,
      success: function (data) {
        console.log(data.data.code);
        if (data.data.code >= 0) {
          wx.switchTab({
            url: '../index/index',
            success: function(data){
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onPullDownRefresh(); 
            }
          })
        }
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
});