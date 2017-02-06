import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Element from 'element-ui';
import App from './App';
import routes from './routes';
import store from './vuex/store';

import 'element-ui/lib/theme-default/index.css';
import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Element);

// 设置全局得http请求
Vue.http.interceptors.push((request, next) => {
  request.method = 'POST';
  request.emulateJSON = true;
  next();
});

const router = new VueRouter({
  routes
});

// 监听路由跳转
router.beforeEach((to, from, next) => {
  if (to.path === '/login' && (window.localStorage.userInfo || window.sessionStorage.userInfo)) {
    router.push('/product');
  } else if (to.path !== '/login' && !(window.localStorage.userInfo || window.sessionStorage.userInfo)) {
    router.push('/login');
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#App');
