import * as types from '@/vuex/mutation-types/common';
import mapUtils from '@/common/js/mapUtils';

const state = {
    lng: 121.39564,
    lat: 31.165204,
    cityPy: '',
    city: ''
};

const getters = {
    [types.GET_COMMON_LOCATION]: (state) => {
        return state;
    }
};

let py = {'021': 'ShangHai'};
let code = {'021': '上海'};

const actions = {
    [types.ACT_COMMON_LOCATION]({state, commit, rootState}, {lng, lat}) {
        commit('common/set/LOCATION', {lng, lat, city: '', cityPy: ''});
        return new Promise((resolve, reject) => {
            mapUtils.getAddress({longitude: lng, latitude: lat}).then(({citycode}) => {
                commit('common/set/LOCATION', {lng, lat, city: code[citycode], cityPy: py[citycode]});
                resolve(code[citycode]);
            });
        });
    }
};

const mutations = {
    [types.SET_COMMON_LOCATION](state, {lng, lat, city, cityPy}) {
        state.lng = lng;
        state.lat = lat;
        state.city = city;
        state.cityPy = cityPy;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
