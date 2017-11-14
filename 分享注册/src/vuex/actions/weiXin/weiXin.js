import * as types from '../../mutation-types/weiXin';

const state = {
  config: {
    appId: '',
    timestamp: '',
    nonceStr: '',
    signature: '',
    jsApiList: {
      share: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    }
  }
};

const getters = {};

const actions = {
  [types.ACT_WEIXIN_CONFIG] ({state, commit, rootState}, {Vue}) {
    return new Promise((resolve, reject) => {
      // 有得话就不调取
      if (state.config.appId !== '') {
        resolve();
        return false;
      }
      // 然后设置签名
      Vue.$http({
        url: rootState.weiXinGetSignUrl,
        body: {
          url: window.location.href.split('#')[0]
        }
      }).then(({body}) => {
        commit('weiXin/set/CONFIG', body.content);
        resolve();
      });
    });
  },
  [types.ACT_WEIXIN_SHARE] ({state, commit, rootState}, {Vue, title, desc, imgUrl}) {
    Vue.$store.dispatch('weiXin/act/CONFIG', {Vue}).then(() => {
      window.wx.config({
        debug: false,
        appId: state.config.appId,
        timestamp: state.config.timestamp,
        nonceStr: state.config.nonceStr,
        signature: state.config.signature,
        jsApiList: state.config.jsApiList.share
      });
      window.wx.ready(() => {
        window.wx.onMenuShareTimeline({
          title,
          imgUrl
        });
        window.wx.onMenuShareAppMessage({
          title,
          desc,
          imgUrl
        });
      });
    });
  }
};

const mutations = {
  [types.SET_WEIXIN_CONFIG] (state, {appId, timestamp, nonceStr, signature}) {
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
