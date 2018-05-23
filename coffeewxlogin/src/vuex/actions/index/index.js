import * as types from '@/vuex/mutation-types/index';

const state = {};

const getters = {};

const actions = {
  [types.ACT_INDEX_SMS]({state, commit, rootState}, {Vue, phone}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.index_smsUrl,
        proxy: false,
        body: {
          phone
        }
      }).then((data) => {
        resolve();
      });
    });
  },
  [types.ACT_INDEX_SETRED]({state, commit, rootState}, {Vue, phone, code}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.index_setRedUrl,
        proxy: false,
        body: {
          code,
          phone
        }
      }).then((data) => {
        resolve();
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
