import router from '@/router';
// 监听路由跳转
router.beforeEach((to, from, next) => {
  // 改变标头
  changeTitle(to.name);
  next();
});

function changeTitle(name) {
  document.title = name;
  // 如果是支付宝才执行
  if (window.navigator.userAgent.toLowerCase().indexOf('alipay') !== -1) {
    let i = document.createElement('iframe');
    i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = () => {
      window.setTimeout(() => {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
}
