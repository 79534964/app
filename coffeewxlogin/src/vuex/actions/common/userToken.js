import * as types from '@/vuex/mutation-types/common';

const state = {
  userToken: '',
  userInfo: null
};

const getters = {
  [types.GET_COMMON_USERTOKEN]: (state) => {
    return state.userToken;
  },
  [types.GET_COMMON_USERINFO]: (state) => {
    return state.userInfo;
  }
};

const actions = {
  [types.ACT_COMMON_USERTOKEN]({state, commit, rootState}, {Vue}) {
    return new Promise((resolve, reject) => {
      let id, userType;
      if (rootState.userType === 'WX') {
        id = rootState.weiXin.openId;
        userType = 2;
      } else {
        id = rootState.zhiFuBao.userId;
        userType = 3;
      }
      Vue.$http({
        url: rootState.getUserTokenUrl,
        body: {
          openId: id,
          userType
        }
      }).then(({body}) => {
        if (body.code === rootState.ok) {
          commit('common/set/USERTOKEN', body.content.token);
          commit('common/set/USERINFO', body.content.userInfo);
          resolve();
        } else {
          // 从新授权
          if (rootState.userType === 'WX') {
            Vue.$store.dispatch('weiXin/act/OPENID', {Vue: this, reload: true});
          } else if (rootState.userType === 'ZFB') {
            Vue.$store.dispatch('zhiFuBao/act/USERID', {Vue: this, reload: true});
          }
        }
      });
    });
  }
};

const mutations = {
  [types.SET_COMMON_USERTOKEN](state, userToken) {
    state.userToken = userToken;
  },
  [types.SET_COMMON_USERINFO](state, info) {
    state.userInfo = info;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
