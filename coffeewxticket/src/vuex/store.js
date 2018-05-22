import Vue from 'vue';
import Vuex from 'vuex';

// store模块
// common
import loading from './actions/common/loading';
// userToken
import userToken from './actions/common/userToken';
// location
import location from './actions/common/location';
// 微信
import weiXin from './actions/weiXin/weiXin';
// 支付宝
import zhiFuBao from './actions/zhiFuBao/zhiFuBao';

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
  // imgUrl: 'http://192.168.2.29:8080/static/img/',
  imgUrl: `http://${window.location.host}/mobile/coffeewxticket/static/img/`,
  // 正确
  ok: '01',
  // common
  // 获取token签名
  weiXinGetSignUrl: `${HOST}sign`,
  getUserTokenUrl: `${HOST}user/login`,
  userType: (() => {
    if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
      return 'WX';
    }
    if (window.navigator.userAgent.toLowerCase().indexOf('alipay') !== -1) {
      return 'ZFB';
    }
    return '';
  })(),
  // WeiXin
  getQuesUrl: `${HOST}asq/ques`,
  getMachineUrl: `${HOST}asq/machine`,
  sumbitQuesUrl: `${HOST}asq/upload`
};

// 这个store就可以连接到我们的应用中
export default new Vuex.Store({
  // 在部署生产时，不要启用严格模式！
  strict: process.env.NODE_ENV !== 'production',
  state,
  modules: {
    loading,
    userToken,
    location,
    weiXin,
    zhiFuBao,
    index,
    http
  }
});
