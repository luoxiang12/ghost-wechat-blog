//index.js
//获取应用实例
const app = getApp()
const wxApi = require('../../utils/wxApi.js');

Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showPopup: false,
    isAuthor:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  showRecent: function() {
    wx.navigateTo({
      url: '../collected/collected?gotoType=recent'
    })
  },
  showCollected: function() {
    wx.navigateTo({
      url: '../collected/collected?gotoType=collected'
    })
  },
  showAboutMe: function() {
    wx.navigateTo({
      url: '../about/about_me'
    })
  },
  showAboutWechat: function() {
    wx.navigateTo({
      url: '../about/about_wechat'
    })
  },
  showFormId: function () {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },

  onLoad: function() {
    let that = this;
    app.checkUserInfo(function(userInfo, isLogin) {
      if (!isLogin) {
        that.setData({
          showPopup: true
        })
      } else {
        that.setData({
          userInfo: userInfo
        });
      }
    });

    wxApi.check_author().then(res => { 
      console.info(res.result)
      that.setData({
        isAuthor: res.result
      });
    })

  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        showPopup: !this.data.showPopup,
        userInfo: e.detail.userInfo
      });
    } else {
      wx.switchTab({
        url: '../index/index'
      })
    }
  },

  /**
   * 返回
   */
  navigateBack: function(e) {
    wx.switchTab({
      url: '../index/index'
    })
  },
  /**
   * 跳转新小程序
   */
  showMiniBlog: function(e){
    wx.navigateToMiniProgram({
      appId: 'wx5642e868dfc28bb0',
      path: 'pages/index/index',
      extraData: {
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  }
})