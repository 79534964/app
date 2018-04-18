// projectTypeMixin
export const userTypeMixin = {
  created() {
    if (this.$route.query.mobile) {
      return;
    }
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

// locationMixin
export const locationMixin = {
  methods: {
    async mixin_location() {
      if (this.$route.query.mobile) {
        await this.$store.dispatch('weiXin/act/LOCATION', {Vue: this});
      }
      if (this.$store.state.userType === 'WX') {
        await this.$store.dispatch('weiXin/act/LOCATION', {Vue: this});
      }
      if (this.$store.state.userType === 'ZFB') {
        await this.$store.dispatch('zhiFuBao/act/LOCATION', {Vue: this});
      }
      return;
    }
  }
};
