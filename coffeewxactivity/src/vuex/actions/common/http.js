import * as types from '@/vuex/mutation-types/common';
import {removeEnter} from '@/common/js/utils';
import {MessageBox} from 'mint-ui';

const state = {};

const getters = {};

const actions = {
  [types.ACT_COMMON_HTTP]({state, commit, rootState}, {Vue, url, body = {}}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTPINTERCEPTORS', {Vue}).then(() => {
        // 开始请求
        Vue.$http({
          url: url,
          body: removeEnter(Object.assign(body, {
            userToken: rootState.userToken.userToken,
            groupId: Vue.$route.query.groupid
          }))
        }).then(({body}) => {
          if (body.code === rootState.ok) {
            resolve(body.content);
            return;
          }
          if (body.code === rootState.onToken) {
            Vue.$store.dispatch('common/act/HTTPINTERCEPTORS', {Vue});
            return;
          }
          Vue.$store.dispatch('common/act/LOADING', {loading: false});
          MessageBox.alert(body.msg);
        }).catch((res) => {
          Vue.$store.dispatch('common/act/LOADING', {loading: false});
          MessageBox.alert('网络异常，请您稍后再试~');
        });
      });
    });
  },
  [types.ACT_COMMON_HTTPINTERCEPTORS]({state, commit, rootState}, {Vue}) {
    return new Promise((resolve, reject) => {
      // 先拦截projectType
      if (rootState.userToken.userInfo === null) {
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
