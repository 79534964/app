import * as types from '../mutation-types';
import module from '../module';

const state = {
  machineList: [],
  timeValue: ''
};

const getters = {
  [types.GET_DATAMACHINE_MACHINELIST]: (state) => {
    return state.machineList;
  },
  [types.GET_DATAMACHINE_TIMEVALUE]: (state) => {
    return state.timeValue;
  }
};

const actions = {
  [types.ACT_DATAMACHINE_DATAMACHINE] ({state, commit, rootState}, {Vue}) {
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
        Vue.$store.dispatch('all/act/checkHttpData', {Vue, data}).then(() => {
          commit('dataMachine/set/MACHINELIST', data.content);
        });
      });
    } else {
      Vue.$message.warning('请选择查询时间区间');
    }
  }
};

const mutations = {
  [types.SET_DATAMACHINE_MACHINELIST] (state, list) {
    // 总计list
    let totalList = {};
    Array.from(list, function (item) {
      // 计算客单价
      item.perticket = item.totalCount - item.free ? (item.totalPay / (item.totalCount - item.free)).toFixed(2) : 0;
      for (let value in item) {
        if (value === 'machineSuppierId') {
          item[value] = item[value] === 'SOS' ? '二代机' : '一代机';
        }
        if (totalList.hasOwnProperty(value)) {
          totalList[value] = totalList[value] * 1 + item[value] * 1;
        } else {
          totalList[value] = item[value];
        }
      }
    });
    for (let value in totalList) {
      totalList[value] = isNaN(totalList[value]) ? totalList[value] : parseInt(totalList[value] * 100) / 100;
      if (value === 'machineSuppierId') {
        totalList[value] = '';
      }
      if (value === 'machineName') {
        totalList[value] = '总计';
      }
      if (value === 'perticket') {
        totalList[value] = totalList.totalCount - totalList.free ? (totalList.totalPay / (totalList.totalCount - totalList.free)).toFixed(2) : 0;
      }
    }
    state.machineList = [...list, totalList];
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
