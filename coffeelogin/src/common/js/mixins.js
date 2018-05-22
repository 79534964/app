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
    this.$store.dispatch('weiXin/act/OPENID', {Vue: this});
  }
};

// locationMixin
export const locationMixin = {
  methods: {
    async mixin_location() {
      let {mobile, latitude, longitude} = this.$route.query;
      if (mobile) {
        await this.$store.dispatch('common/act/LOCATION', {latitude, longitude});
      } else if (this.$store.state.userType === 'WX') {
        await this.$store.dispatch('weiXin/act/LOCATION', {Vue: this});
      } else if (this.$store.state.userType === 'ZFB') {
        await this.$store.dispatch('zhiFuBao/act/LOCATION', {Vue: this});
      }
    }
  }
};
