import * as types from '../../mutation-types/index';
import {Toast} from 'mint-ui';

const state = {
  groupInfo: null,
  done: [],
  record: [],
  groupFlag: false
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
  [types.ACT_INDEX_GROUPINFO] ({state, commit, rootState}, {Vue, groupId, phone, type = 1}) {
    return new Promise((resolve, reject) => {
      Vue.$http({
        url: rootState.getGroupInfoUrl,
        body: {
          groupId,
          phone
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
          // 领取完调用不判断
          if (type !== 1) {
            resolve();
            return false;
          }
          if (content.done.length !== 0) {
            // 表示活动时间结束
            Toast('你已经抢过这个红包了');
            commit('index/set/GROUPFLAG', true);
            return false;
          }
          if (content.endTime < new Date().getTime() / 1000) {
            // 表示活动时间结束
            Toast('这个红包已经结束');
            return false;
          }
          if (content.startTime > new Date().getTime() / 1000) {
            // 表示活动暂未开始
            Toast('这个红包暂未开始');
            return false;
          }
          if (content.usable * 1 !== 1 || !content.ruleSize) {
            // 表示没有可领优惠券
            Toast('这个红包已经领完了');
            return false;
          }
          commit('index/set/GROUPFLAG', true);
          resolve();
        } else {
          Toast('找不到该活动信息');
        }
      });
    });
  },
  [types.ACT_INDEX_SMSSEND] ({state, commit, rootState}, {Vue, phone}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.setSmsSendUrl,
        body: {
          phone
        }
      }).then((data) => {
        resolve();
      });
    });
  },
  [types.ACT_INDEX_SUMBIT] ({state, commit, rootState}, {Vue, phone, code}) {
    return new Promise((resolve, reject) => {
      Vue.$store.dispatch('common/act/HTTP', {
        Vue,
        url: rootState.submitUrl,
        body: {
          code,
          phone
        }
      }).then((data) => {
        resolve();
        Toast(data.received === 0 ? '领取成功！' : '你已经抢过这个红包了');
        Vue.$store.dispatch('index/act/GROUPINFO', {Vue, groupId: Vue.$route.query.groupid, phone, type: 2});
      });
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
