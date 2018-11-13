const actionType = {
  WX: 'weiXin',
  ZFB: 'zhiFuBao'
};

// projectTypeMixin
export const userTypeMixin = {
  created() {
    const userType = {
      WX: 'OPENID',
      ZFB: 'USERID'
    };
    this.$store.dispatch(`${actionType[this.$store.state.userType]}/act/${userType[this.$store.state.userType]}`, {Vue: this});
  }
};
