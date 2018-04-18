import * as types from '../../mutation-types/zhiFuBao';
import {getCookie, escapeUrl} from '@/common/js/utils';

const state = {
  userId: '',
  serviceUrl: `${window.location.host}/coffeewx/alitoOauth?path=`
};

const getters = {
  [types.GET_ZHIFUBAO_USERID]: (state) => {
    return state.userId;
  }
};

const actions = {
  [types.ACT_ZHIFUBAO_USERID]({state, commit, rootState}, {Vue, reload = false}) {
    if (!getCookie('alipayUserId') || reload) {
      // 如果没有openId 如果reload就直接强制请求服务器
      window.location.href = escapeUrl(window.location.href).replace(`${window.location.host}/`, state.serviceUrl);
    } else {
      commit('zhiFuBao/set/USERID', getCookie('alipayUserId'));
    }
  },
  [types.ACT_ZHIFUBAO_LOCATION]({state, commit, rootState}, {Vue}) {
    return new Promise(function (resolve, reject) {
      window.Ali.geolocation.getCurrentPosition({
        // 超时时间
        timeout: 5000
      }, (res) => {
        if (!res.errorCode) {
          Vue.$store.dispatch('common/act/LOCATION', {
            latitude: res.coords.latitude,
            longitude: res.coords.longitude
          }).then(() => {
            resolve();
          });
        }
      });
    });
  }
};

const mutations = {
  [types.SET_ZHIFUBAO_USERID](state, userId) {
    state.userId = userId;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
