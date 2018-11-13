import '@/libs';
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/vuex/store';
// 公共样式
import '@/common/stylus/index.styl';

// http拦截器
import '@/interceptors/http';
// router拦截器
import '@/interceptors/router';

// 关闭生产模式下给出的提示
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
