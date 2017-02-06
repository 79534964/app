import * as types from '../mutation-types';

const state = {
  menuList: [],
  selectList: []
};

const getters = {
  [types.GET_SYSTEMMENU_MENULIST]: (state) => {
    return state.menuList;
  },
  [types.GET_SYSTEMMENU_SELECTLIST]: (state) => {
    return state.selectList;
  }
};

const actions = {
  [types.ACT_SYSTEMMENU_MENULIST] ({state, commit, rootState}, {Vue}) {
    Vue.loading = true;
    Vue.$http({
      url: rootState.systemMenuUrl,
      body: {
        usertoken: rootState.login.token
      }
    }).then((res) => {
      Vue.$store.dispatch('all/act/checkHttpData', {Vue, res}).then((data) => {
        commit('systemMenu/set/SELECTLIST', data.content);
        commit('systemMenu/set/MENULIST', data.content);
      });
    });
  },
  [types.ACT_SYSTEMMENU_DELETEMENU] ({state, commit, rootState}, {id, Vue}) {
    Vue.loading = true;
    Vue.$http({
      url: rootState.systemMenuDeleteUrl,
      body: {
        usertoken: rootState.login.token,
        id
      }
    }).then((res) => {
      Vue.$store.dispatch('all/act/checkHttpData', {Vue, res}).then((data) => {
        Vue.$store.dispatch('systemMenu/act/MENULIST', {Vue});
        Vue.$message({type: 'success', message: '删除成功!'});
      });
    });
  },
  [types.ACT_SYSTEMMENU_ADDMENU] ({state, commit, rootState}, {Vue, name, parentid, sort, href, icon}) {
    Vue.loading = true;
    Vue.$http({
      url: rootState.systemMenuAddUrl,
      body: {
        usertoken: rootState.login.token,
        name,
        parentid,
        sort,
        href,
        icon
      }
    }).then((res) => {
      Vue.$store.dispatch('all/act/checkHttpData', {Vue, res}).then((data) => {
        Vue.$store.dispatch('systemMenu/act/MENULIST', {Vue});
        Vue.$message({type: 'success', message: '添加成功!'});
      });
    });
  },
  [types.ACT_SYSTEMMENU_UPDATEMENU] ({state, commit, rootState}, {Vue, id, name, parentid, sort, href, icon}) {
    Vue.loading = true;
    Vue.$http({
      url: rootState.systemMenuUpdateUrl,
      body: {
        usertoken: rootState.login.token,
        id,
        name,
        parentid,
        sort,
        href,
        icon
      }
    }).then((res) => {
      Vue.$store.dispatch('all/act/checkHttpData', {Vue, res}).then((data) => {
        Vue.$store.dispatch('systemMenu/act/MENULIST', {Vue});
        Vue.$message({type: 'success', message: '修改成功!'});
      });
    });
  }
};

const mutations = {
  [types.SET_SYSTEMMENU_MENULIST] (state, list) {
    let arr = [];
    Array.from(list, function (item) {
      item.parentName = '主目录';
      arr.push(item);
      Array.from(item.secondmenulist, function (e) {
        for (let object of state.selectList) {
          if (e.parent === object.value) {
            e.parentName = object.key;
          }
        }
        arr.push(e);
      });
    });
    state.menuList = arr;
    arr = null;
  },
  [types.SET_SYSTEMMENU_SELECTLIST] (state, list) {
    let arr = [];
    arr.push({key: '主菜单', value: 0});
    Array.from(list, function (item) {
      arr.push({key: item.name, value: item.id});
    });
    state.selectList = arr;
    arr = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
