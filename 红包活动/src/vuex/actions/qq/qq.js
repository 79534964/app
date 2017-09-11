import * as types from '../../mutation-types/qq';

const state = {};

const getters = {};

const actions = {
  [types.ACT_QQ_SHARE] ({state, commit, rootState}, {title, desc}) {
    var headerNode = document.getElementsByTagName('head')[0];
    var titleMeta1 = document.createElement('meta');
    var titleMeta2 = document.createElement('meta');
    titleMeta1.name = 'keywords';
    titleMeta1.content = desc;
    titleMeta2.name = 'Description';
    titleMeta2.content = desc;
    headerNode.appendChild(titleMeta1);
    headerNode.appendChild(titleMeta2);
    if (window.navigator.userAgent.toLowerCase().indexOf('qq') !== -1) {
      document.title = title;
    }
  }
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
