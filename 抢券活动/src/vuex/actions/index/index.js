import * as types from '../../mutation-types/index';

const state = {
  userPhone: null
};

const getters = {
  [types.GET_INDEX_QUESTION]: (state) => {
    return state.question;
  }
};

const actions = {
  [types.ACT_INDEX_QUESTION] ({state, commit, rootState}, {Vue}) {
    Vue.$store.dispatch('common/act/HTTP', {
      Vue,
      url: rootState.getQuestionUrl
    }).then((data) => {
      if (data.isUsed === 0) {
        let {answer, question, answerType, userPhone, id} = data;
        commit('index/set/QUESTION', {question, answerType, id});
        commit('index/set/USERPHONE', userPhone);
        commit('index/set/ANSWERLIST', answer);
        Vue.value = '';
        return false;
      }
      if (data.isUsed === 1) {
        let {answerId, answer, question, userPhone} = data;
        commit('index/set/ANSWERVALUE', answerId.toString());
        commit('index/set/QUESTION', question);
        commit('index/set/USERPHONE', userPhone);
        commit('index/set/ANSWERLIST', answer);
        return false;
      }
      if (data.isUsed === 2) {
        let {answerId, answer, question, userPhone, coupon} = data;
        commit('index/set/ANSWERVALUE', answerId.toString());
        commit('index/set/QUESTION', question);
        commit('index/set/USERPHONE', userPhone);
        commit('index/set/ANSWERLIST', answer);
        commit('index/set/COUPONINFO', coupon);
        return false;
      }
    });
  }
};

const mutations = {
  [types.SET_INDEX_QUESTION] (state, question) {
    state.question = question;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
