import Vue from 'vue';
import App from '@/App';
import store from '@/vuex/store';

import libs from '@/libs';
import '@/plugin/mint/style';
import plugin from '@/plugin';

Vue.use(libs);
Vue.use(plugin);

// 关闭生产模式下给出的提示
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
