import * as types from '../../mutation-types/index';
import {Toast, MessageBox} from 'mint-ui';

const state = {
  userPhone: null,
  question: {
    question: '',
    answerType: '',
    id: ''
  },
  answerList: [],
  answerValue: null,
  couponInfo: []
};

const getters = {
  [types.GET_INDEX_QUESTION]: (state) => {
    return state.question;
  },
  [types.GET_INDEX_USERPHONE]: (state) => {
    return state.userPhone;
  },
  [types.GET_INDEX_COUPONINFO]: (state) => {
    return state.couponInfo;
  },
  [types.GET_INDEX_ANSWERLIST]: (state) => {
    return state.answerList;
  },
  [types.GET_INDEX_ANSWERVALUE]: (state) => {
    return state.answerValue;
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
  },
  [types.ACT_INDEX_SMSSEND] ({state, commit, rootState}, {Vue, phone}) {
    Vue.$store.dispatch('common/act/HTTP', {
      Vue,
      url: rootState.setSmsSendUrl,
      body: {
        phone
      }
    }).then((data) => {
      Vue.changeCaptcha();
    });
  },
  [types.ACT_INDEX_SUBMITQUESTION] ({state, commit, rootState}, {Vue, answerId, questionId}) {
    Vue.$store.dispatch('common/act/HTTP', {
      Vue,
      url: rootState.submitQuestionUrl,
      body: {
        answerId,
        questionId
      }
    }).then((data) => {
      if (data === 1) {
        commit('index/set/ANSWERVALUE', answerId);
        Toast('正确！请领取优惠券');
      } else {
        MessageBox({
          title: '提示',
          message: '答案不正确',
          confirmButtonText: '继续答',
          cancelButtonText: '换一题',
          showCancelButton: true
        }).then((data) => {
          if (data !== 'confirm') {
            Vue.$store.dispatch('index/act/QUESTION', {Vue});
          }
        });
      }
    });
  },
  [types.ACT_INDEX_SUBMITCOUPON] ({state, commit, rootState}, {Vue, phone, code, type}) {
    Vue.$store.dispatch('common/act/HTTP', {
      Vue,
      url: rootState.submitCouponUrl,
      body: {
        phone,
        code,
        type
      }
    }).then((data) => {
      commit('index/set/COUPONINFO', data.coupon);
      commit('index/set/USERPHONE', phone);
    });
  }
};

const mutations = {
  [types.SET_INDEX_QUESTION] (state, question) {
    state.question = question;
  },
  [types.SET_INDEX_USERPHONE] (state, phone) {
    state.userPhone = phone;
  },
  [types.SET_INDEX_COUPONINFO] (state, info) {
    state.couponInfo = info;
  },
  [types.SET_INDEX_ANSWERLIST] (state, answer) {
    let arr = [];
    answer.map((item) => {
      arr.push({
        label: item.answer,
        value: item.id.toString()
      });
    });
    state.answerList = arr;
  },
  [types.SET_INDEX_ANSWERVALUE] (state, value) {
    state.answerValue = value;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
