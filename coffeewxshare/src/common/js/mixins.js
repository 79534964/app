export const shareMixin = {
  created() {
    if (this.$store.state.isWeiXin === 1) {
      this.$store.dispatch('weiXin/act/SHARE', {
        Vue: this,
        title: '送你一张全免券，即刻一键约泡吧～',
        desc: '约泡成功第一步，下个单试试？',
        imgUrl: 'http://img.mattburg.cn/group1/M00/00/77/cHx_VloJPZeAD_KpAAGzoxcWilM246.jpg'
      });
    }
    this.$store.dispatch('qq/act/SHARE', {
      title: '送你一张全免券，即刻一键约泡吧～',
      desc: '约泡成功第一步，下个单试试？'
    });
  }
};
