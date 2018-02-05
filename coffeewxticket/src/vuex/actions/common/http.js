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
        body
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
  }
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
