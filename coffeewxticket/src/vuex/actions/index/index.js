import * as types from '../../mutation-types/index';

const state = {};

const getters = {
  [types.GET_INDEX_GROUPINFO]: (state) => {
    return state.groupInfo;
  }
};

const actions = {
  [types.ACT_INDEX_GROUPINFO]({state, commit, rootState}, {Vue, phone, type = 1}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.getGroupInfoUrl,
        body: {
          phone
        }
      }).then((data) => {
        if (data.usable === 0) {
          // 表示没有可领优惠券
          Toast('这个红包已经领完了');
          return false;
        }
        commit('index/set/GROUPFLAG', true);
        resolve();
      });
    });
  }
};

const mutations = {
  [types.SET_INDEX_GROUPINFO](state, info) {
    state.groupInfo = info;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
