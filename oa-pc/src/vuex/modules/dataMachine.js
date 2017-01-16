import * as types from '../mutation-types';

const state = {
  machineList: []
};

const getters = {
  getDataMachineMachineList: (state) => {
    return state.machineList;
  }
};

const actions = {
  dataMachine ({state, commit, rootState}, params) {
    let Vue = params.vue;
    Vue.loading = true;
    Vue.$http({
      url: rootState.dataMachineUrl,
      method: 'POST',
      emulateJSON: true,
      params: {
        usertoken: rootState.login.token,
        starttime: params.starttime,
        endtime: params.endtime
      }
    }).then((res) => {
      Vue.loading = false;
      let data = res.body;
      if (data.code === rootState.ok) {
        commit(types.SET_DATAMACHINE_MACHINELIST, data.content);
      } else {
        Vue.$message.error(data.msg);
      }
    });
  }
};

const mutations = {
  [types.SET_DATAMACHINE_MACHINELIST] (state, list) {
    // 总后的总计对象
    let object = {};
    Array.from(list, function (item) {
      // 计算客单价
      item.perticket = item.totalCount - item.free ? (item.totalPay / (item.totalCount - item.free)).toFixed(2) : 0;
      for (let value in item) {
        if (value === 'machineSuppierId') {
          item[value] = item[value] === 'SOS' ? '二代机' : '一代机';
        }
        if (object.hasOwnProperty(value)) {
          object[value] = object[value] * 1 + item[value] * 1;
        } else {
          object[value] = item[value];
        }
      }
    });
    object.machineName = '总计';
    object.machineSuppierId = '';
    object.countPay = parseInt(object.countPay * 100) / 100;
    object.otherPay = parseInt(object.otherPay * 100) / 100;
    object.totalPay = parseInt(object.totalPay * 100) / 100;
    object.perticket = object.totalCount - object.free ? (object.totalPay / (object.totalCount - object.free)).toFixed(2) : 0;
    state.machineList = [...list, object];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
