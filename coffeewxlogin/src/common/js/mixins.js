// projectTypeMixin
export const userTypeMixin = {
  created() {
    if (this.$store.state.userType === 'WX') {
      this.$store.dispatch('weiXin/act/OPENID', {Vue: this});
      return;
    }
    if (this.$store.state.userType === 'ZFB') {
      this.$store.dispatch('zhiFuBao/act/USERID', {Vue: this});
      return;
    }
    window.alert('请用支付宝或微信打开！');
  }
};
