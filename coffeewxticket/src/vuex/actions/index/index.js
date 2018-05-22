import * as types from '../../mutation-types/index';

const state = {
  ques: [{}],
  machines: [],
  coupon: null
};

const getters = {
  [types.GET_INDEX_QUES]: (state) => {
    return state.ques;
  },
  [types.GET_INDEX_COUPON]: (state) => {
    return state.coupon;
  },
  [types.GET_INDEX_MACHINES]: (state) => {
    return state.machines;
  }
};

const actions = {
  [types.ACT_INDEX_QUES]({state, commit, rootState}, {Vue, batch}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.getQuesUrl,
        body: {
          batch
        }
      }).then((data) => {
        commit('index/set/QUES', data);
        resolve();
      });
    });
  },
  [types.ACT_INDEX_COUPON]({state, commit, rootState}, {Vue, answer, batch, machineId}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.sumbitQuesUrl,
        body: {
          answer,
          batch,
          machineId
        }
      }).then((data) => {
        commit('index/set/COUPON', data);
        resolve();
      });
    });
  },
  [types.ACT_INDEX_MACHINES]({state, commit, rootState}, {Vue}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.getMachineUrl,
        body: {
          lon: rootState.location.location.longitude || 0,
          lat: rootState.location.location.latitude || 0
        }
      }).then((data) => {
        commit('index/set/MACHINES', data);
        resolve();
      });
    });
  }
};

const mutations = {
  [types.SET_INDEX_QUES](state, list) {
    if (list.length !== 0) {
      let answers = [];
      state.machines.map(({machineName, id}) => {
        answers.push({answer: machineName, id});
      });
      list.unshift({
        question: '请选择您经常下单的咖啡机（未下单用户，系统将为您推荐附近20公里内的咖啡机）', id: 99999, answers
      });
    }
    state.ques = list;
  },
  [types.SET_INDEX_COUPON](state, info) {
    state.coupon = info;
  },
  [types.SET_INDEX_MACHINES](state, list) {
    state.machines = list;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
