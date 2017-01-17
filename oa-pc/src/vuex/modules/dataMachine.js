import * as types from '../mutation-types';
import module from '../module';

const state = {
  machineList: [],
  timeValue: ''
};

const getters = {
  getDataMachineMachineList: (state) => {
    return state.machineList;
  },
  getDataMachineTimeValue: (state) => {
    return state.timeValue;
  }
};

const actions = {
  dataMachine ({state, commit, rootState}, {Vue}) {
    if (state.timeValue) {
      Vue.loading = true;
      Vue.$http({
        url: rootState.dataMachineUrl,
        method: 'POST',
        emulateJSON: true,
        params: {
          usertoken: rootState.login.token,
          starttime: module.getDateTime(new Date(state.timeValue[0]), 'start'),
          endtime: module.getDateTime(new Date(state.timeValue[1]), 'end')
        }
      }).then((res) => {
        Vue.loading = false;
        let data = res.body;
        Vue.$store.dispatch('checkHttpData', {Vue, data}).then(() => {
          commit(types.SET_DATAMACHINE_MACHINELIST, data.content);
        });
      });
    } else {
      Vue.$message.warning('请选择查询时间区间');
    }
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
  },
  [types.SET_DATAMACHINE_TIMEVALUE] (state, time) {
    state.timeValue = time;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
