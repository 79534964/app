import * as types from '@/vuex/mutation-types/common';

const state = {
  loading: false
};

const getters = {
  [types.GET_COMMON_LOADING]: (state) => {
    return state.loading;
  }
};

const actions = {
  [types.ACT_COMMON_LOADING] ({state, commit, rootState}, {loading}) {
    commit('common/set/LOADING', window.navigator.onLine ? loading : false);
  }
};

const mutations = {
  [types.SET_COMMON_LOADING] (state, beal) {
    // 没网络的时候设置为false
    state.loading = beal;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
