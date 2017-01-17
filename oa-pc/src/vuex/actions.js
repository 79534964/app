export default {
  checkHttpData({state, commit, rootState}, {Vue, data}) {
    return new Promise((resolve, reject) => {
      if (data.code === rootState.ok) {
        resolve();
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
  }
};
