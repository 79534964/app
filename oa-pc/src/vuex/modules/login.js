import * as types from '../mutation-types';

const state = {
  userInfo: '',
  loginFlag: true,
  userName: '',
  token: ''
};

const getters = {
  getUserName: (state) => {
    return state.userName;
  }
};

const actions = {
  login ({state, commit, rootState}, params) {
    let Vue = params.vue;
    if (state.loginFlag) {
      commit(types.SET_LOGINFLAG, false);
      Vue.$http({
        url: rootState.loginUrl,
        method: 'POST',
        emulateJSON: true,
        params: {
          loginname: params.user,
          password: params.password
        }
      }).then((res) => {
        commit(types.SET_LOGINFLAG, true);
        let data = res.body;
        if (data.code === rootState.ok) {
          let info = JSON.stringify(data.content);
          if (params.radioValue) {
            window.localStorage.userInfo = info;
          } else {
            window.sessionStorage.userInfo = info;
          }
          commit(types.SET_USERINFO, info);
          Vue.$router.push('/product');
        } else {
          Vue.$alert(data.msg, '温馨提示');
        }
      });
    } else {
      Vue.$alert('正在登陆中，请稍后', '温馨提示');
    }
  },
  setLoginFlag ({commit}, flag) {
    commit(types.SET_LOGINFLAG, flag);
  },
  initInfo ({commit}) {
    commit(types.SET_USERINFO);
  }
};

const mutations = {
  [types.SET_USERINFO] (state, userInfo = window.localStorage.userInfo || window.sessionStorage.userInfo || '{}') {
    state.userInfo = JSON.parse(userInfo);
    state.userName = state.userInfo.name;
    state.token = state.userInfo.ouid;
  },
  [types.SET_LOGINFLAG] (state, flag) {
    state.loginFlag = flag;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
