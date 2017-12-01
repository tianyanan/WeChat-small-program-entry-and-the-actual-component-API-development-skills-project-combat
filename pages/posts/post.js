var postsData = require('../../data/posts-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:"Sep 18 2016",
    title:"正是虾肥蟹壮时"
  },
  /**
   * 生命周期函数--监听页面加载。 当页面渲染完成后执行的函数（包含本地的data数据，不包含远程ajax请求的data数据）； 相当于window.onload;
   */
  onLoad: function (options) {
    // setData也可以设置新的数据属性
    this.setData({
      post_key: postsData.postList
    });

    // 小程序的事件机制 ，冒泡与非冒泡
    // podt 文章列表页面
    // 当前项， 当前项的下标
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload");
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
  ontap:function (event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "./post-detail/post-detail?id=" + postId
    })
  }
})

