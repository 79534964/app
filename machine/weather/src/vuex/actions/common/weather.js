import * as types from '@/vuex/mutation-types/common';
import mapUtils from '@/common/js/mapUtils';

let weatherMap = {
    '晴': 'fine',
    '多云': 'cloud',
    '阴': 'yin',
    '阵雨': 'smallRain',
    '雷阵雨': 'thunderRain',
    '雷阵雨并伴有冰雹': 'thunderRain',
    '雨夹雪': 'smallSnow',
    '小雨': 'smallRain',
    '中雨': 'middleRain',
    '大雨': 'bigRain',
    '暴雨': 'bigRain',
    '大暴雨': 'bigerRain',
    '特大暴雨': 'bigerRain',
    '阵雪': 'smallSnow',
    '小雪': 'smallSnow',
    '中雪': 'middleSnow',
    '大雪': 'bigSnow',
    '暴雪': 'bigSnow',
    '雾': 'fog',
    '冻雨': 'smallRain',
    '沙尘暴': 'wind',
    '小雨-中雨': 'smallRain',
    '中雨-大雨': 'middleRain',
    '大雨-暴雨': 'bigRain',
    '暴雨-大暴雨': 'bigerRain',
    '大暴雨-特大暴雨': 'bigerRain',
    '小雪-中雪': 'middleSnow',
    '中雪-大雪': 'bigSnow',
    '大雪-暴雪': 'bigSnow',
    '浮尘': 'wind',
    '扬沙': 'wind',
    '强沙尘暴': 'wind',
    '飑': 'wind',
    '龙卷风': 'wind',
    '弱高吹雪': 'smallSnow',
    '轻雾': 'smog',
    '霾': 'smog'
};

const state = {
    day: null,
    days: []
};

const getters = {
    [types.GET_COMMON_WEATHER]: (state) => {
        return state;
    }
};

const actions = {
    [types.ACT_COMMON_WEATHER]({state, commit, rootState}, {city}) {
        return new Promise((resolve, reject) => {
            mapUtils.getWeather(city).then(({day, days}) => {
                commit('common/set/WEATHER', {day, days});
                resolve();
            });
        });
    }
};

const mutations = {
    [types.SET_COMMON_WEATHER](state, {day, days}) {
        day.weatherImg = weatherMap[day.weather];
        state.day = day;
        days.map((e) => {
            e.dayWeatherImg = weatherMap[e.dayWeather];
        });
        state.days = days;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
