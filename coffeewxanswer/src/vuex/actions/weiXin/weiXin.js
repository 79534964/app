import * as types from '@/vuex/mutation-types/weiXin';
import {getCookie, escapeUrl} from '@/common/js/utils';
import {MessageBox} from 'mint-ui';

const state = {
  openId: '',
  serviceUrl: `${window.location.host}/coffeewx/toOauth?path=`,
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

const getters = {
  [types.GET_WEIXIN_OPENID]: (state) => {
    return state.openId;
  }
};

const actions = {
  [types.ACT_WEIXIN_OPENID] ({state, commit, rootState}, {Vue, reload = false}) {
    // 如果没有openId 如果reload就直接强制请求服务器
    if (!getCookie('openId') || reload) {
      window.location.href = escapeUrl(window.location.href).replace(`${window.location.host}/`, state.serviceUrl);
    } else {
      commit('weiXin/set/OPENID', getCookie('openId'));
      Vue.$store.dispatch('weiXin/act/CONFIG', {Vue});
    }
  },
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
  [types.ACT_WEIXIN_SHARE] ({state, commit, rootState}, {Vue, title, desc}) {
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
          imgUrl: `${rootState.imgUrl}share.jpg`,
          success: () => {
            MessageBox.alert('分享成功！');
          }
        });
        window.wx.onMenuShareAppMessage({
          title,
          desc,
          imgUrl: `${rootState.imgUrl}share.jpg`,
          success: () => {
            MessageBox.alert('分享成功！');
          }
        });
      });
    });
  }
};

const mutations = {
  [types.SET_WEIXIN_OPENID] (state, openId) {
    state.openId = openId;
  },
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
