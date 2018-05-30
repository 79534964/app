import Vuex from 'vuex';
import state from './config';
// common
import http from './actions/common/http';
import loading from './actions/common/loading';
// index
import index from './actions/index/index';

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  modules: {
    http,
    loading,
    index
  }
});
