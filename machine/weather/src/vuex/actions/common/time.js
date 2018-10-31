import * as types from '@/vuex/mutation-types/common';

const state = {
    hour: '',
    minute: '',
    month: '',
    date: '',
    day: '',
    monthE: '',
    dayE: ''
};

const getters = {
    [types.GET_COMMON_TIME]: (state) => {
        return state;
    }
};

let days = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
let monthsE = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let daysE = ['Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.', 'Sun.'];
const actions = {
    [types.ACT_COMMON_TIME]({state, commit, rootState}) {
        let time = new Date();
        let hour = time.getHours();
        let minute = time.getMinutes();
        if (minute < 10) {
            minute = `0${minute}`;
        }
        let month = time.getMonth() + 1;
        let monthE = monthsE[time.getMonth()];
        if (month < 10) {
            month = `0${month}`;
        }
        let date = time.getDate();
        let day = days[time.getDay() - 1] || '星期日';
        let dayE = daysE[time.getDay() - 1] || 'Sun';
        commit('common/set/TIME', {hour, minute, month, date, day, monthE, dayE});
    }
};

const mutations = {
    [types.SET_COMMON_TIME](state, {hour, minute, month, date, day, monthE, dayE}) {
        state.hour = hour;
        state.minute = minute;
        state.month = month;
        state.date = date;
        state.day = day;
        state.monthE = monthE;
        state.dayE = dayE;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
