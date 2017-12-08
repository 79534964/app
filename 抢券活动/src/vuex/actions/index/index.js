import * as types from '../../mutation-types/index';

const state = {
  info: null,
  coupons: []
};

const getters = {
  [types.GET_INDEX_INFO]: (state) => {
    return state.info;
  },
  [types.GET_INDEX_COUPONS]: (state) => {
    return state.coupons;
  }
};

const actions = {
  [types.ACT_INDEX_INFO]({state, commit, rootState}, {Vue}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.getGroupInfoUrl
      }).then((data) => {
        commit('index/set/INFO', data);
        resolve();
      });
    });
  },
  [types.ACT_INDEX_SMS]({state, commit, rootState}, {Vue, phone}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.smsUrl,
        proxy: false,
        body: {
          phone
        }
      }).then((data) => {
        resolve();
      });
    });
  },
  [types.ACT_INDEX_COUPONS]({state, commit, rootState}, {Vue, phone, code}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.couponUrl,
        body: {
          phone,
          code
        }
      }).then((data) => {
        commit('index/set/COUPONS', data);
        resolve();
      });
    });
  }
};

const mutations = {
  [types.SET_INDEX_INFO](state, info) {
    state.info = info;
  },
  [types.SET_INDEX_COUPONS](state, coupons) {
    state.coupons = coupons;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
