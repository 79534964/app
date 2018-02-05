import * as types from '../../mutation-types/index';

const state = {
  ques: []
};

const getters = {
  [types.GET_INDEX_QUES]: (state) => {
    return state.ques;
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
  }
};

const mutations = {
  [types.SET_INDEX_QUES](state, list) {
    state.ques = list;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
