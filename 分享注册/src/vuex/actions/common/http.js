import * as types from '../../mutation-types/common';
import {MessageBox} from 'mint-ui';

const state = {};

const getters = {};

const actions = {
  [types.ACT_COMMON_HTTP]({state, commit, rootState}, {Vue, url, body = {}}) {
    return new Promise((resolve, reject) => {
      // 开始请求
      Vue.$http({
        url,
        body: Object.assign(body, {inviteCode: Vue.$route.query.inviteCode})
      }).then(({body}) => {
        if (body.code === rootState.ok) {
          resolve(body.content);
          return false;
        }
        MessageBox.alert(body.msg);
        Vue.$store.dispatch('common/act/LOADING', {loading: false});
        // 如果绑定了 错误需要处理的function 就执行
        if (Vue.$store.$reject) {
          Vue.$store.$reject();
          Vue.$store.$reject = null;
        }
      }).catch((res) => {
        Vue.$store.dispatch('common/act/LOADING', {loading: false});
        MessageBox.alert('网络异常！');
      });
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
