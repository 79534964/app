import * as types from '../mutation-types';

const state = {
  userInfo: '',
  loginFlag: true,
  userName: '',
  token: ''
};

const getters = {
  [types.GET_LOGIN_USERNAME]: (state) => {
    return state.userName;
  }
};

const actions = {
  [types.ACT_LOGIN_LOGIN] ({state, commit, rootState}, {Vue, user, password, radioValue}) {
    if (state.loginFlag) {
      commit('login/set/FLAG', false);
      Vue.$http({
        url: rootState.loginUrl,
        method: 'POST',
        emulateJSON: true,
        params: {
          loginname: user,
          password: password
        }
      }).then((res) => {
        commit('login/set/FLAG', true);
        let data = res.body;
        Vue.$store.dispatch('all/act/checkHttpData', {Vue, data}).then(() => {
          let info = JSON.stringify(data.content);
          if (radioValue) {
            window.localStorage.userInfo = info;
          } else {
            // 关闭浏览器注销token
            window.onunload = () => {

            };
            window.sessionStorage.userInfo = info;
          }
          commit('login/set/USERINFO', info);
          Vue.$router.push('/product');
        });
      });
    } else {
      Vue.$alert('正在登陆中，请稍后', '温馨提示');
    }
  },
  [types.ACT_LOGIN_USERINFO] ({commit}) {
    commit('login/set/USERINFO');
  }
};

const mutations = {
  [types.SET_LOGIN_USERINFO] (state, userInfo = window.localStorage.userInfo || window.sessionStorage.userInfo || '{}') {
    state.userInfo = JSON.parse(userInfo);
    state.userName = state.userInfo.name;
    state.token = state.userInfo.usertoken;
  },
  [types.SET_LOGIN_FLAG] (state, flag) {
    state.loginFlag = flag;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
