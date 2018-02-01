import Vue from 'vue';

Vue.http.interceptors.push((request, next) => {
  config(request);
  isLine();
  next();
});

// 所有请求post和json
function config(request) {
  request.method = 'POST';
  request.emulateJSON = true;
}

// 判断网络
import {MessageBox} from 'mint-ui';
function isLine() {
  if (!window.navigator.onLine) {
    MessageBox({
      title: '网络不稳定',
      message: '刷新一下,试一试?',
      showCancelButton: true
    }).then((data) => {
      if (data === 'confirm') {
        window.location.reload();
      }
    });
  }
}
