import * as types from '../../mutation-types/common';
import {MessageBox} from 'mint-ui';

const state = {};

const getters = {};

const actions = {
  [types.ACT_COMMON_HTTP]({state, commit, rootState}, {Vue, url, body = {}}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTPINTERCEPTORS', {Vue}).then(() => {
        // 开始请求
        Vue.$http({
          url,
          body: Object.assign(body, {
            userToken: rootState.userToken.userToken,
            type: Vue.$route.query.mobile ? 1 : 2,
            mobile: Vue.$route.query.mobile || ''
          })
        }).then(({body}) => {
          if (body.code === rootState.ok) {
            resolve(body.content);
            return;
          }
          MessageBox.alert(body.msg);
          Vue.$store.dispatch('common/act/LOADING', {loading: false});
        }).catch((res) => {
          Vue.$store.dispatch('common/act/LOADING', {loading: false});
          MessageBox.alert('网络异常！');
        });
      });
    });
  },
  [types.ACT_COMMON_HTTPINTERCEPTORS]({state, commit, rootState}, {Vue}) {
    return new Promise((resolve, reject) => {
      // 先拦截projectType
      if (rootState.userToken.userInfo === null && !Vue.$route.query.mobile) {
        Vue.$store.dispatch('common/act/USERTOKEN', {Vue}).then((res) => {
          resolve();
        });
      } else {
        resolve();
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
