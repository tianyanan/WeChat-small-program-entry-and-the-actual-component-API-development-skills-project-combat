var postsData = require('../../../data/posts-data.js');
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    // 更新视图数据
    this.setData({
      postData: postsData.postList[postId]
    });
    // 缓存机制; // 缓存不去主动清除， 则永久存在。 
    // 缓存最大可存储10mb的数据
    // 添加缓存时，有则修改（修改key的值），无则添加（添加key及key的值）;

    var postsCollected = wx.getStorageSync('posts_collected');
    // 第一次为假，是个空字符串
    if (postsCollected) { 
      // 获取不再存在的缓存也为假
      var postCollected = postsCollected[postId]
      console.log(postCollected);
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;// 初次进入，没有缓存;
      wx.setStorageSync('posts_collected', postsCollected)
    }


    if (app.globalData.gIsPlayingMusic[postId]) {
      this.setData({
        isPlayingMusic: true
      });
    }


    // 监听音乐的播放与暂停
    var _this = this;
    wx.onBackgroundAudioPlay(function () { // 播放音乐设置为true
      _this.setData({
        isPlayingMusic: true
      });
      app.globalData.gIsPlayingMusic[postId] = true;
    });
    
    wx.onBackgroundAudioPause(function () { //暂停音乐设置为false
      _this.setData({
        isPlayingMusic: false
      });
      app.globalData.gIsPlayingMusic[postId] = false;
    });
  },
  
  onColletionTap:function (event) {
    // 缓存api的应用
    var postsCollected = wx.getStorageSync('posts_collected'); // 获取到一个对象;
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected);

    this.setData({
      collected: postCollected
    });

    // 交互反馈api的应用
    wx.showToast({
      // postCollected为真则返回 "收藏成功"， 否则返回 "取消功能" ;
      title: postCollected ? '收藏成功':'取消成功',
      duration:1000,
      icon:'loading'
    });
  },


  onFenXiang:function (event) {
    var arrList = [
      "分享到QQ",
      "分享到微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: arrList,
      success:function (res) { // 点击取消后，不会执行回调函数
        console.log(res);
        // 交互反馈api的应用
        wx.showToast({
          // postCollected为真则返回 "收藏成功"， 否则返回 "取消功能" ;
          title: arrList[res.tapIndex],
          duration: 1000,
          icon: 'loading'
        });
      }
    });
  },


  // 音乐播放
  onMusicTap:function (event) {
    console.log(app);
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic ) {
      wx.pauseBackgroundAudio(); // 暂停音乐
      this.setData({
        isPlayingMusic:false
      });
    } else {
      wx.playBackgroundAudio({// 音乐播放没有放在小程序中，而是呈现在了微信客户端的微信页面的顶部
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImg: postData.music.coverImg
      });
      this.setData({
        isPlayingMusic:true
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // 生命周期函数可以理解为是事件处理函数， 而生命周期函数的名称就是事件名称；
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
  
  }
})
