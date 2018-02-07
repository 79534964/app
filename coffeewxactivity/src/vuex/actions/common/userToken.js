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
  [types.ACT_COMMON_USERTOKEN] ({state, commit, rootState}, {Vue}) {
    return new Promise((resolve, reject) => {
      Vue.$http({
        url: rootState.getUserTokenUrl,
        body: {
          unionId: rootState.userType === 'WX' ? rootState.weiXin.openId : rootState.zhiFuBao.userId,
          userType: rootState.userType === 'WX' ? 2 : 3
        }
      }).then(({body}) => {
        if (body.code === rootState.ok) {
          commit('common/set/USERTOKEN', body.content.token);
          commit('common/set/USERINFO', body.content.userInfo);
          resolve();
        } else {
          // 找不到用户再跳转
          if (rootState.userType === 'WX') {
            Vue.$store.dispatch('weiXin/act/OPENID', {Vue: this, reload: true});
            return false;
          }
          if (rootState.userType === 'ZFB') {
            Vue.$store.dispatch('zhiFuBao/act/USERID', {Vue: this, reload: true});
            return false;
          }
        }
      });
    });
  },
  [types.ACT_COMMON_CHECKUSERTOKEN] ({state, commit, rootState}, {Vue}) {
    return new Promise((resolve, reject) => {
      Vue.$http({
        url: rootState.checkUserTokenUrl,
        body: {
          userToken: state.userToken
        }
      }).then(({body}) => {
        resolve(body.code);
      });
    });
  }
};

const mutations = {
  [types.SET_COMMON_USERTOKEN] (state, userToken) {
    state.userToken = userToken;
  },
  [types.SET_COMMON_USERINFO] (state, info) {
    state.userInfo = info;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
