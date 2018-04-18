import * as types from '../../mutation-types/common';

const state = {
  location: {
    // 经度
    longitude: 0,
    // 纬度
    latitude: 0
  }
};

const getters = {
  [types.GET_COMMON_LOCATION]: (state) => {
    return state.location;
  }
};

const actions = {
  [types.ACT_COMMON_LOCATION]({state, commit, rootState}, {longitude, latitude}) {
    return new Promise((resolve, reject) => {
      commit('common/set/LOCATION', {longitude, latitude});
      resolve();
    });
  }
};

const mutations = {
  [types.SET_COMMON_LOCATION](state, {longitude, latitude}) {
    state.location = {longitude, latitude};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
