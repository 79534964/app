import * as types from '../mutation-types';

const state = {
  pagenumber: 1,
  orderList: [],
  total: 1,
  radioValue: 'orderid',
  inputValue: ''
};

const getters = {
  [types.GET_ORDERQUERY_ORDERLIST]: (state) => {
    return state.orderList;
  },
  [types.GET_ORDERQUERY_TOTAL]: (state) => {
    return state.total;
  },
  [types.GET_ORDERQUERY_PAGENUMBER]: (state) => {
    return state.pagenumber;
  },
  [types.GET_ORDERQUERY_RADIOVALUE]: (state) => {
    return state.radioValue;
  },
  [types.GET_ORDERQUERY_INPUTVALUE]: (state) => {
    return state.inputValue;
  }
};

const actions = {
  [types.ACT_ORDERQUERY_ORDERQUERY] ({state, commit, rootState}, {Vue, page}) {
    if (state.inputValue) {
      if (state.radioValue === 'orderid' || state.radioValue === 'machineid' || state.radioValue === 'mobile') {
        if (isNaN(state.inputValue)) {
          Vue.$message.warning('输入的值必须为数字');
          return '';
        }
      }
      commit('orderQuery/set/PAGENUMBER', page);
      Vue.loading = true;
      Vue.$http({
        url: rootState.orderQueryUrl,
        method: 'POST',
        emulateJSON: true,
        params: {
          usertoken: rootState.login.token,
          pagenumber: state.pagenumber,
          pagesize: 10,
          [state.radioValue]: state.inputValue
        }
      }).then((res) => {
        Vue.loading = false;
        let data = res.body;
        Vue.$store.dispatch('all/act/checkHttpData', {Vue, data}).then(() => {
          if (data.content.list.length === 0) {
            Vue.$alert('我们查不到您要的订单内容，请核实您的查询条件', '提示');
          }
          commit('orderQuery/set/ORDERLIST', data.content.list);
          commit('orderQuery/set/TOTAL', data.content.totalRow);
        });
      });
    } else {
      Vue.$message.warning('请您输入查询内容');
    }
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
  },
  [types.SET_ORDERQUERY_RADIOVALUE] (state, value) {
    state.radioValue = value;
  },
  [types.SET_ORDERQUERY_INPUTVALUE] (state, value) {
    state.inputValue = value;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
