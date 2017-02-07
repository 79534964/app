import * as types from '../mutation-types';

const state = {
  companyList: []
};

const getters = {
  [types.GET_SYSTEMCOMPANY_COMPANYLIST]: (state) => {
    return state.companyList;
  }
};

const actions = {
  [types.ACT_SYSTEMCOMPANY_COMPANYLIST] ({state, commit, rootState}, {Vue}) {
    Vue.loading = true;
    Vue.$http({
      url: rootState.systemCompanyUrl,
      body: {
        usertoken: rootState.login.token
      }
    }).then((res) => {
      Vue.$store.dispatch('all/act/checkHttpData', {Vue, res}).then((data) => {
        commit('systemCompany/set/COMPANYLIST', data.content);
      });
    });
  },
  [types.ACT_SYSTEMCOMPANY_ADDCOMPANY] ({state, commit, rootState}, {Vue, companyname, companydisplayname, describe}) {
    Vue.loading = true;
    Vue.$http({
      url: rootState.systemCompanyAddUrl,
      body: {
        usertoken: rootState.login.token,
        companyname,
        companydisplayname,
        describe
      }
    }).then((res) => {
      Vue.$store.dispatch('all/act/checkHttpData', {Vue, res}).then((data) => {
        Vue.$store.dispatch('systemCompany/act/COMPANYLIST', {Vue});
        Vue.$message({type: 'success', message: '添加成功!'});
      });
    });
  },
  [types.ACT_SYSTEMCOMPANY_UPDATCOMPANY] ({state, commit, rootState}, {Vue, id, companyname, companydisplayname, describe}) {
    Vue.loading = true;
    Vue.$http({
      url: rootState.systemCompanyUpdateUrl,
      body: {
        usertoken: rootState.login.token,
        id,
        companyname,
        companydisplayname,
        describe
      }
    }).then((res) => {
      Vue.$store.dispatch('all/act/checkHttpData', {Vue, res}).then((data) => {
        Vue.$store.dispatch('systemCompany/act/COMPANYLIST', {Vue});
        Vue.$message({type: 'success', message: '修改成功!'});
      });
    });
  },
  [types.ACT_SYSTEMCOMPANY_DELETECOMPANY] ({state, commit, rootState}, {Vue, id}) {
    Vue.loading = true;
    Vue.$http({
      url: rootState.systemCompanyDeleteUrl,
      body: {
        usertoken: rootState.login.token,
        id
      }
    }).then((res) => {
      Vue.$store.dispatch('all/act/checkHttpData', {Vue, res}).then((data) => {
        Vue.$store.dispatch('systemCompany/act/COMPANYLIST', {Vue});
        Vue.$message({type: 'success', message: '删除成功!'});
      });
    });
  }
};

const mutations = {
  [types.SET_SYSTEMCOMPANY_COMPANYLIST] (state, list) {
    state.companyList = list;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
