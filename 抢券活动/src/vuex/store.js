import Vue from 'vue';
import Vuex from 'vuex';

// store模块
// 微信
import weiXin from './actions/weiXin/weiXin';
// 支付宝
import zhiFuBao from './actions/zhiFuBao/zhiFuBao';
// common
import http from './actions/common/http';
import loading from './actions/common/loading';
import userToken from './actions/common/userToken';
import groupInfo from './actions/common/groupInfo';
// index
import index from './actions/index/index';

Vue.use(Vuex);

// 测试接口地址
const HOST = 'http://test.wx.mattburg.cn/coffeewx/';
// 正式接口
// const HOST = 'http://org.oa.mattburg.cn/coffeewx/';
// 创建一个对象来保存应用启动时的初始状态
const state = {
  // 测试
  imgUrl: 'http://192.168.2.16:8080/static/img/',
  // imgUrl: `http://${window.location.host}/mobile/coffeewxanswer/static/img/`,
  // 正确
  ok: '01',
  // 判断微信支付宝
  userType: window.navigator.userAgent.toLowerCase().indexOf('micromessenger') === -1 ? 'WX' : navigator.userAgent.toLowerCase().indexOf('alipay') !== -1 ? 'ZFB' : '',
  // weiXin
  // 微信获取签名接口
  weiXinGetSignUrl: `${HOST}sign`,
  // zhiFuBao
  zhiFuBaoPayUrl: `${HOST}payment/wappay`,
  // common
  // 获取token签名
  getUserTokenUrl: `${HOST}user/login`,
  // 校验token
  checkUserTokenUrl: `${HOST}user/checkToken`,
  // groupInfo
  getGroupInfoUrl: `${HOST}acc/info`
  // index
};

// 这个store就可以连接到我们的应用中
export default new Vuex.Store({
  // 在部署生产时，不要启用严格模式！
  strict: process.env.NODE_ENV !== 'production',
  state,
  modules: {
    // weiXin
    weiXin,
    // zhiFuBao
    zhiFuBao,
    // common
    http,
    loading,
    userToken,
    groupInfo,
    // index
    index
  }
});
