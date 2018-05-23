import Vuex from 'vuex';
import state from './config';
// store模块
// 微信
import weiXin from './actions/weiXin/weiXin';
// 支付宝
import zhiFuBao from './actions/zhiFuBao/zhiFuBao';
// common
import http from './actions/common/http';
import userToken from './actions/common/userToken';
import loading from './actions/common/loading';
// index
import index from './actions/index/index';

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  modules: {
    // weiXin
    weiXin,
    // zhiFuBao
    zhiFuBao,
    // common
    http,
    userToken,
    loading,
    // order
    index
  }
});
