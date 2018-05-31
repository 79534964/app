import * as types from '@/vuex/mutation-types/index';

const state = {};

const getters = {};

const actions = {
  [types.ACT_INDEX_SUBMIT]({state, commit, rootState}, {Vue, phone, city, area, name, fund, hasPosition, position}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.index_submitUrl,
        body: {
          phone,
          city,
          area,
          name,
          fund,
          hasPosition,
          position
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
