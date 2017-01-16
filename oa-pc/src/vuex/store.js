import Vue from 'vue';
import Vuex from 'vuex';
// store模块
import login from './modules/login';
import orderQuery from './modules/orderQuery';
import dataMachine from './modules/dataMachine';

Vue.use(Vuex);

const HOST = 'http://test.wx.mattburg.cn/managerment/';
// 创建一个对象来保存应用启动时的初始状态
const state = {
  ok: '01',
  loginUrl: `${HOST}login?`,
  orderQueryUrl: `${HOST}order/getorderinfo?`,
  dataMachineUrl: `${HOST}order/getreport?`
};

// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  // 在部署生产时，不要启用严格模式！
  strict: process.env.NODE_ENV !== 'production',
  state,
  modules: {
    login,
    orderQuery,
    dataMachine
  }
});
