import router from '@/router';
// 监听路由跳转
router.beforeEach((to, from, next) => {
  isLine();
  next();
});

// 判断网络
import {MessageBox} from 'mint-ui';
function isLine() {
  if (!window.navigator.onLine) {
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
