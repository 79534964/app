import Layout from '@/plugin/layout';
import Mint from '@/plugin/mint';

export default {
    install(Vue, options) {
        Vue.use(Layout);
        Vue.use(Mint);
    }
};
