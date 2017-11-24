// userTypeMixin
export const userTypeMixin = {
  created() {
    if (this.$store.state.userType === 'WX') {
      this.$store.dispatch('weiXin/act/OPENID', {Vue: this});
      return false;
    }
    if (this.$store.state.userType === 'ZFB') {
      window.alert('请用微信打开！');
      // this.mixin_setScriptSrc(this.mixin_zhifubaoSrc);
      // this.$store.dispatch('zhiFuBao/act/USERID', {Vue: this});
      return false;
    }
    window.alert('请用微信打开！');
  }
};
