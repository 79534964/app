import * as types from '../../mutation-types/index';

const state = {};

const getters = {
  [types.GET_INDEX_QUES]: (state) => {
    return state.ques;
  }
};

const actions = {
  [types.ACT_INDEX_QUES]({state, commit, rootState}, {Vue, batch}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.getQuesUrl,
        body: {
          batch
        }
      }).then((data) => {
        commit('index/set/QUES', data);
        resolve();
      });
    });
  }
};

const mutations = {
  [types.SET_INDEX_MACHINES](state, list) {
    state.machines = list;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
