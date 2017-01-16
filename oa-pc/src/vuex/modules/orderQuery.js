import * as types from '../mutation-types';

const state = {
  pagenumber: 1,
  orderList: [],
  total: 1
};

const getters = {
  getOrderQueryList: (state) => {
    return state.orderList;
  },
  getOrderQueryTotal: (state) => {
    return state.total;
  },
  getOrderQueryPageNumber: (state) => {
    return state.pagenumber;
  }
};

const actions = {
  orderQuery ({state, commit, rootState}, params) {
    let Vue = params.vue;
    Vue.loading = true;
    Vue.$http({
      url: rootState.orderQueryUrl,
      method: 'POST',
      emulateJSON: true,
      params: {
        userid: rootState.login.token,
        pagenumber: state.pagenumber,
        pagesize: 10,
        [params.radioValue]: params.inputValue
      }
    }).then((res) => {
      Vue.loading = false;
      let data = res.body;
      if (data.code === rootState.ok) {
        if (data.content.list.length === 0) {
          Vue.$alert('我们查不到您要的订单内容，请核实您的查询条件', '提示');
        }
        commit(types.SET_ORDERQUERY_ORDERLIST, data.content.list);
        commit(types.SET_ORDERQUERY_TOTAL, data.content.totalRow);
      } else {
        Vue.$message.error(data.msg);
      }
    });
  },
  setOrderQueryPageNumber ({commit}, number) {
    commit(types.SET_ORDERQUERY_PAGENUMBER, number);
  }
};

const mutations = {
  [types.SET_ORDERQUERY_PAGENUMBER] (state, number) {
    state.pagenumber = number;
  },
  [types.SET_ORDERQUERY_ORDERLIST] (state, list) {
    state.orderList = list;
  },
  [types.SET_ORDERQUERY_TOTAL] (state, number) {
    state.total = number;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
