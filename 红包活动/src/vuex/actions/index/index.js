import * as types from '../../mutation-types/index';
import {setCookie} from '@/common/js/utils';
import {Toast} from 'mint-ui';

const state = {
  groupInfo: null,
  done: [],
  record: [],
  groupFlag: true
};

const getters = {
  [types.GET_INDEX_GROUPINFO]: (state) => {
    return state.groupInfo;
  },
  [types.GET_INDEX_DONE]: (state) => {
    return state.done;
  },
  [types.GET_INDEX_RECORD]: (state) => {
    return state.record;
  },
  [types.GET_INDEX_GROUPFLAG]: (state) => {
    return state.groupFlag;
  }
};

const actions = {
  [types.ACT_INDEX_GROUPINFO] ({state, commit, rootState}, {Vue, groupId}) {
    return new Promise((resolve, reject) => {
      Vue.$http({
        url: rootState.getGroupInfoUrl,
        body: {
          groupId
        }
      }).then(({body}) => {
        let {content} = body;
        if (content !== null) {
          commit('index/set/DONE', content.done);
          commit('index/set/RECORD', content.record);
          commit('index/set/GROUPINFO', content);
          Vue.$store.dispatch('weiXin/act/SHARE', {
            Vue,
            title: content.shareTitle,
            desc: content.shareContent,
            imgUrl: content.shareImgUrl
          });
          if (content.done.length !== 0) {
            // 表示活动时间结束
            Toast('你已经抢过这个红包了');
            return false;
          }
          if (content.endTime < new Date().getTime() / 1000) {
            // 表示活动时间结束
            Toast('这个红包已经结束');
            commit('index/set/GROUPFLAG', false);
            return false;
          }
          if (content.startTime > new Date().getTime() / 1000) {
            // 表示活动暂未开始
            Toast('这个红包暂未开始');
            commit('index/set/GROUPFLAG', false);
            return false;
          }
          if (content.usable * 1 !== 1 || !content.ruleSize) {
            // 表示没有可领优惠券
            Toast('这个红包已经领完了');
            commit('index/set/GROUPFLAG', false);
            return false;
          }
          resolve();
        } else {
          Toast('找不到该活动信息');
        }
      });
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
  [types.ACT_INDEX_SUMBIT] ({state, commit, rootState}, {Vue, phone, code}) {
    Vue.$store.dispatch('common/act/HTTP', {
      Vue,
      url: rootState.submitUrl,
      body: {
        code,
        phone
      }
    }).then((data) => {
      setCookie('uer_phone', phone);
      Vue.$emit('success');
      console.log(data);
    });
  }
};

const mutations = {
  [types.SET_INDEX_GROUPINFO] (state, info) {
    state.groupInfo = info;
  },
  [types.SET_INDEX_DONE] (state, done) {
    state.done = done;
  },
  [types.SET_INDEX_RECORD] (state, record) {
    state.record = record;
  },
  [types.SET_INDEX_GROUPFLAG] (state, beal) {
    state.groupFlag = beal;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
