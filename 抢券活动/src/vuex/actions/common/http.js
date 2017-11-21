import * as types from '@/vuex/mutation-types/common';
import {removeEnter} from '@/common/js/utils';
import {MessageBox} from 'mint-ui';

const state = {};

const getters = {};

const actions = {
  [types.ACT_COMMON_HTTP] ({state, commit, rootState}, {Vue, url, body = {}}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTPINTERCEPTORS', {Vue}).then(() => {
        Vue.$store.dispatch('common/act/LOADING', {loading: true});
        // 开始请求
        Vue.$http({
          url,
          body: removeEnter(Object.assign(body, {
            userToken: rootState.userToken.userToken,
            groupId: Vue.$route.query.groupid
          }))
        }).then(({body}) => {
          Vue.$store.dispatch('common/act/LOADING', {loading: false});
          if (body.code === rootState.ok) {
            resolve(body.content);
            return false;
          }
          MessageBox.alert(body.msg);
          // 如果绑定了 错误需要处理的function 就执行
          if (Vue.$store.$reject) {
            Vue.$store.$reject();
            Vue.$store.$reject = null;
          }
        }).catch((res) => {
          Vue.$store.dispatch('common/act/LOADING', {loading: false});
          MessageBox.alert('抱歉,服务器开小差了~');
        });
      });
    });
  },
  [types.ACT_COMMON_HTTPINTERCEPTORS] ({state, commit, rootState}, {Vue}) {
    return new Promise((resolve, reject) => {
      // 先拦截projectType
      if ((rootState.weiXin.openId !== '' && rootState.userType === 'WX') || (rootState.zhiFuBao.userId !== '' && rootState.userType === 'ZFB')) {
        // 再检验token
        Vue.$store.dispatch('common/act/CHECKUSERTOKEN', {Vue}).then((code) => {
          // token过期 重新获取token
          if (code === '300') {
            Vue.$store.dispatch('common/act/USERTOKEN', {Vue}).then((res) => {
              resolve();
            });
          } else {
            resolve();
          }
        });
      }
    });
  }
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
