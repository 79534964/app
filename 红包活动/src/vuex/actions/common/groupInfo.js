import * as types from '../../mutation-types/common';
import {Toast} from 'mint-ui';

const state = {
  groupInfo: null
};

const getters = {
  [types.GET_COMMON_GROUPINFO]: (state) => {
    return state.groupInfo;
  }
};

const actions = {
  [types.ACT_COMMON_GROUPINFO] ({state, commit, rootState}, {Vue, groupId}) {
    return new Promise((resolve, reject) => {
      Vue.$http({
        url: rootState.getGroupInfoUrl,
        body: {
          groupId
        }
      }).then(({body}) => {
        let {content} = body;
        if (content !== null) {
          Vue.$store.dispatch('weiXin/act/SHARE', {Vue, title: content.shareTitle, desc: content.shareContent});
          if (content.endTime < new Date().getTime() / 1000) {
            // 表示活动时间结束
            Toast('该活动已经结束');
            return false;
          }
          if (content.startTime > new Date().getTime() / 1000) {
            // 表示活动暂未开始
            Toast('该活动暂未开始');
            return false;
          }
          if (content.usable * 1 !== 1 || !content.ruleSize) {
            // 表示没有可领优惠券
            Toast('该活动没有可领取的优惠券');
            return false;
          }
          commit('common/set/GROUPINFO', content);
          resolve();
        } else {
          Toast('找不到该活动信息');
        }
      });
    });
  }
};

const mutations = {
  [types.SET_COMMON_GROUPINFO] (state, object) {
    state.groupInfo = object;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
