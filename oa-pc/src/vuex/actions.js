import * as types from './mutation-types';

export default {
  [types.ACT_ALL_CHECKHTTPDATA] ({state, commit, rootState}, {Vue, res}) {
    if (res.status === 200) {
      if (Vue.loading) {
        Vue.loading = false;
      }
      let data = res.body;
      return new Promise((resolve, reject) => {
        if (data.code === rootState.ok) {
          resolve(data);
        } else if (data.code === rootState.noToken) {
          Vue.$alert('登陆过期，请您重新登陆', '温馨提示', {
            callback: () => {
              window.localStorage.clear();
              window.sessionStorage.clear();
              window.location.reload();
            }
          });
        } else {
          Vue.$message.error(data.msg);
        }
      });
    } else {
      Vue.$message.warning('请求失败，服务器异常');
    }
  }
};
