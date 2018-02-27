import * as types from '../../mutation-types/index';

const state = {
  ques: [{}],
  coupon: null
};

const getters = {
  [types.GET_INDEX_QUES]: (state) => {
    return state.ques;
  },
  [types.GET_INDEX_COUPON]: (state) => {
    return state.coupon;
  }
};

const actions = {
  [types.ACT_INDEX_QUES]({state, commit, rootState}, {Vue, mobile}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.getQuesUrl,
        body: {
          mobile
        }
      }).then((data) => {
        commit('index/set/QUES', data);
        resolve();
      });
    });
  },
  [types.ACT_INDEX_COUPON]({state, commit, rootState}, {Vue, mobile, answer}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.sumbitQuesUrl,
        body: {
          mobile,
          answer
        }
      }).then((data) => {
        commit('index/set/COUPON', data);
        resolve();
      });
    });
  }
};

const mutations = {
  [types.SET_INDEX_QUES](state, list) {
    state.ques = list;
  },
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
