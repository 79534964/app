import Vue from 'vue';
import Vuex from 'vuex';
// actions全局得
import actions from './actions';
// store模块
import login from './modules/login';
import orderQuery from './modules/orderQuery';
import dataMachine from './modules/dataMachine';
import systemMenu from './modules/systemMenu';
import systemCompany from './modules/systemCompany';

Vue.use(Vuex);

const HOST = 'http://test.wx.mattburg.cn/managerment/';
// 创建一个对象来保存应用启动时的初始状态
const state = {
  ok: '01',
  noToken: '300',
  noCode: '600',
  logoutUrl: `${HOST}login/logout`,
  loginUrl: `${HOST}login`,
  orderQueryUrl: `${HOST}order/getorderinfo`,
  dataMachineUrl: `${HOST}order/getreport`,
  systemMenuUrl: `${HOST}menu`,
  systemMenuAddUrl: `${HOST}menu/add`,
  systemMenuDeleteUrl: `${HOST}menu/delete`,
  systemMenuUpdateUrl: `${HOST}menu/update`,
  systemCompanyUrl: `${HOST}company`,
  systemCompanyAddUrl: `${HOST}company/add`,
  systemCompanyDeleteUrl: `${HOST}company/delete`,
  systemCompanyUpdateUrl: `${HOST}company/update`
};

// 这个store就可以连接到我们的应用中
export default new Vuex.Store({
  // 在部署生产时，不要启用严格模式！
  strict: process.env.NODE_ENV !== 'production',
  actions,
  state,
  modules: {
    login,
    orderQuery,
    dataMachine,
    systemMenu,
    systemCompany
  }
});
