//app.js
App({
  globalData:{
    gIsPlayingMusic: false,
    gCurrentMusicPostId: null
  }
});


//总结：
  // 1：只有在app.json中注册过的页面， 小程序才认为是页面;
  // 2：每次请求页面时， Page对象中所有data数据都会初始化为最初 " 状态/数据 ";
  // 3：事件处理函数也叫作事件监听器
  // 4：app.js中的app对象为全局对象， 所有的页面都可以使用app对象中的数据; 在其他页面中使用app对象数据（变量）需要显示的调用getApp()方法来获取到全局对象（app对象）
