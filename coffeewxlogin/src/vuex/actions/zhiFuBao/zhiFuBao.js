import * as types from '@/vuex/mutation-types/zhiFuBao';

const state = {
  userId: '',
  serviceUrl: `${window.location.host}/mobile/base/auth.html?path=`
};

const getters = {
  [types.GET_ZHIFUBAO_USERID]: (state) => {
    return state.userId;
  }
};

const actions = {
  [types.ACT_ZHIFUBAO_USERID]({state, commit, rootState}, {Vue, reload = false}) {
    if (!window.$utils.getCookie('alipayUserId')) {
      window.location.href = window.location.href.replace(`${window.location.host}/`, state.serviceUrl);
    } else {
      commit('zhiFuBao/set/USERID', window.$utils.getCookie('alipayUserId'));
    }
  }
};

const mutations = {
  [types.SET_ZHIFUBAO_USERID](state, userId) {
    state.userId = userId;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
