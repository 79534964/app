import * as types from '../../mutation-types/common';

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
    commit('common/set/LOADING', loading);
  }
};

const mutations = {
  [types.SET_COMMON_LOADING] (state, beal) {
    state.loading = beal;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
