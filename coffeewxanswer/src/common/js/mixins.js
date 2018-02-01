// userTypeMixin
export const userTypeMixin = {
  data() {
    return {
      mixin_weixinSrc: 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js',
      mixin_zhifubaoSrc: 'http://as.alipayobjects.com/g/component/antbridge/1.1.4/antbridge.min.js'
    };
  },
  created() {
    if (this.$store.state.userType === 'WX') {
      this.mixin_setScriptSrc(this.mixin_weixinSrc);
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
  },
  methods: {
    mixin_setScriptSrc(src) {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }
};

export const checkGroupInfoMixin = {
  methods: {
    mixin_checkGroupInfo() {
      if (this.$store.state.userType === '') {
        return false;
      }
      return new Promise((resolve, reject) => {
        this.$store.dispatch('common/act/GROUPINFO', {Vue: this, groupId: this.$route.query.groupid}).then(() => {
          resolve();
        });
      });
    }
  }
};
