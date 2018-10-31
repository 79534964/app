import Vue from 'vue';
import Vuex from 'vuex';

import api from './api';

import loading from './actions/common/loading';
import location from './actions/common/location';
import time from './actions/common/time';
import weather from './actions/common/weather';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: api,
    modules: {
        loading,
        location,
        time,
        weather
    }
});
