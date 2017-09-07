import {getCookie} from '@/common/js/utils';
// groupInfoMixin
export const groupInfoMixin = {
  created() {
    let {groupid} = this.$route.query;
    let phone = getCookie('user_phone');
    this.$store.dispatch('index/act/GROUPINFO', {Vue: this, phone, groupId: groupid}).then(() => {
      phone && this.$store.state.isWeiXin === 1 && this.$store.dispatch('index/act/SUMBIT', {
        Vue: this,
        phone,
        code: ''
      });
    });
  }
};
