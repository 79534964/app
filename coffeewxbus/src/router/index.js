import Router from 'vue-router';
import index from '@/components/index/index';

import notes from '@/components/index/pages/notes/notes';

export default new Router({
  routes: [
    {
      name: '我要加盟',
      path: '/',
      component: index,
      children: [{
        name: '合作须知',
        path: '/notes',
        component: notes
      }]
    }
  ]
});
