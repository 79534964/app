import Vue from 'vue';
import Vuex from 'vuex';

// store模块
// common
import loading from './actions/common/loading';
import weiXin from './actions/weiXin/weiXin';
import qq from './actions/qq/qq';
import http from './actions/common/http';
// index
import index from './actions/index/index';

Vue.use(Vuex);

// 测试接口地址
// const HOST = 'http://test.wx.mattburg.cn/coffeewx/';
// 正式接口
const HOST = 'http://org.oa.mattburg.cn/coffeewx/';
// 创建一个对象来保存应用启动时的初始状态
const state = {
  // 测试
  // imgUrl: 'http://192.168.2.16:8080/static/img/',
  imgUrl: `http://${window.location.host}/mobile/coffeewxshare/static/img/`,
  // 正确
  ok: '01',
  // 判断微信支付宝
  isWeiXin: (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 || window.navigator.userAgent.toLowerCase().indexOf('qq') !== -1) ? 1 : 0,
  // WeiXin
  // 获取微信签名
  weiXinGetSignUrl: `${HOST}sign`,
  // index
  setSmsSendUrl: `${HOST}invite/sendCode`,
  submitUrl: `${HOST}invite/grabNew`
};

// 这个store就可以连接到我们的应用中
export default new Vuex.Store({
  // 在部署生产时，不要启用严格模式！
  strict: process.env.NODE_ENV !== 'production',
  state,
  modules: {
    loading,
    weiXin,
    qq,
    http,
    // index
    index
  }
});
