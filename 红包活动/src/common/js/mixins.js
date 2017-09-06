import {getCookie} from '@/common/js/utils';
// groupInfoMixin
export const groupInfoMixin = {
  created() {
    let {groupId} = this.$route.query;
    this.$store.dispatch('index/act/GROUPINFO', {Vue: this, groupId}).then(() => {
      let phone = getCookie('user_phone');
      phone && this.$store.dispatch('index/act/SUMBIT', {Vue: this, phone: phone, code: ''});
    });
  }
};
