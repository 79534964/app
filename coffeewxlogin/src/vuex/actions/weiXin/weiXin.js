import * as types from '@/vuex/mutation-types/weiXin';
import {getCookie, escapeUrl} from '@/common/js/utils';

const state = {
  openId: '',
  serviceUrl: `${window.location.host}/coffeewx/toOauth?path=`,
  config: {
    appId: '',
    timestamp: '',
    nonceStr: '',
    signature: '',
    jsApiList: ['scanQRCode', 'openLocation', 'getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage']
  }
};

const getters = {
  [types.GET_WEIXIN_OPENID]: (state) => {
    return state.openId;
  }
};

const actions = {
  [types.ACT_WEIXIN_OPENID]({state, commit, rootState}, {Vue, reload = false}) {
    if (!getCookie('openId') || reload) {
      // 如果没有openId 如果reload就直接强制请求服务器
      window.location.href = escapeUrl(window.location.href).replace(`${window.location.host}/`, state.serviceUrl);
    } else {
      Vue.$store.dispatch('weiXin/act/CONFIG', {Vue});
    }
  },
  [types.ACT_WEIXIN_CONFIG]({state, commit, rootState}, {Vue}) {
    return new Promise((resolve, reject) => {
      // 有得话就不调取
      if (state.config.appId !== '') {
        resolve();
        return;
      }
      commit('weiXin/set/OPENID', getCookie('openId'));
      // 然后设置签名
      Vue.$http({
        url: rootState.weiXinGetSignUrl,
        body: {
          url: window.location.href.split('#')[0]
        }
      }).then(({body}) => {
        window.setTimeout(() => {
          let title = '咖啡码头';
          let link = window.location.href;
          let imgUrl = `${rootState.imgUrl}share.jpg`;
          let desc = '24小时专属咖啡师';
          window.wx.config({
            debug: false,
            appId: body.content.appId,
            timestamp: body.content.timestamp,
            nonceStr: body.content.nonceStr,
            signature: body.content.signature,
            jsApiList: state.config.jsApiList
          });
          window.wx.ready(() => {
            window.wx.onMenuShareTimeline({
              title,
              link,
              imgUrl,
              success: () => {
              }
            });
            window.wx.onMenuShareAppMessage({
              title,
              link,
              desc,
              imgUrl,
              success: () => {
              }
            });
            commit('weiXin/set/CONFIG', body.content);
            resolve();
          });
        }, 200);
      });
    });
  }
};

const mutations = {
  [types.SET_WEIXIN_OPENID](state, openId) {
    state.openId = openId;
  },
  [types.SET_WEIXIN_CONFIG](state, {appId, timestamp, nonceStr, signature}) {
    state.config.appId = appId;
    state.config.timestamp = timestamp;
    state.config.nonceStr = nonceStr;
    state.config.signature = signature;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
