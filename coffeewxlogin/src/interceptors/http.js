import Vue from 'vue';
import {MessageBox} from 'mint-ui';

Vue.http.interceptors.push((request, next) => {
  config(request);
  isLine(next);
});

// 所有请求post和json
function config(request) {
  request.method = 'POST';
  request.emulateJSON = true;
}

function isLine(next) {
  if (window.navigator.onLine) {
    next();
  } else {
    MessageBox({
      message: '网络不稳定,刷新一下?',
      showCancelButton: true
    }).then((data) => {
      if (data === 'confirm') {
        window.location.reload();
      }
    });
  }
}
