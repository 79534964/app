import * as types from '../../mutation-types/index';

const state = {
  coupon: null
};

const getters = {
  [types.GET_INDEX_COUPON]: (state) => {
    return state.coupon;
  }
};

const actions = {
  [types.ACT_INDEX_SMSSEND]({state, commit, rootState}, {Vue, phone}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.setSmsSendUrl,
        body: {
          phone
        }
      }).then((data) => {
        resolve();
      });
    });
  },
  [types.ACT_INDEX_SUMBIT]({state, commit, rootState}, {Vue, phone, smsCode}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.submitUrl,
        body: {
          smsCode,
          phone
        }
      }).then((data) => {
        commit('index/set/COUPON', data);
        resolve();
      });
    });
  }
};

const mutations = {
  [types.SET_INDEX_COUPON](state, info) {
    state.coupon = info;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
