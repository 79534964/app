import Router from 'vue-router';
import index from '@/components/index/index';

export default new Router({
  routes: [
    {
      name: '绑定手机号',
      path: '/',
      component: index,
      children: []
    }
  ]
});
