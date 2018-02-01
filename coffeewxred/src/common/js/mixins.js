import {getCookie} from '@/common/js/utils';
// groupInfoMixin
export const groupInfoMixin = {
  created() {
    let phone = getCookie('user_phone');
    this.$store.dispatch('index/act/GROUPINFO', {Vue: this, phone}).then(() => {
      phone && this.$store.state.isWeiXin === 1 && this.$store.dispatch('index/act/SUMBIT', {
        Vue: this,
        phone,
        code: ''
      });
    });
  }
};
