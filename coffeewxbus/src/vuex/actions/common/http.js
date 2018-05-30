import * as types from '@/vuex/mutation-types/common';
import {MessageBox} from 'mint-ui';

const state = {};

const getters = {};

const actions = {
  [types.ACT_COMMON_HTTP]({state, commit, rootState}, {Vue, url, body = {}}) {
    return new Promise((resolve, reject) => {
      Vue.$http({
        url,
        body
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
  }
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
