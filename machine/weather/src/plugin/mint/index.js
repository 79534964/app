import toast from 'mint-ui/lib/toast';
import messageBox from 'mint-ui/lib/message-box';

import button from 'mint-ui/lib/button';
import field from 'mint-ui/lib/field';
import swipe from 'mint-ui/lib/swipe';
import radio from 'mint-ui/lib/radio';

export default {
    install(Vue, options) {
        Vue.prototype.$messageBox = messageBox;
        Vue.prototype.$toast = toast;
        Vue.component('mt-field', field);
        Vue.component('mt-button', button);
        Vue.component('mt-swipe', swipe);
        Vue.component('mt-radio', radio);
    }
};
