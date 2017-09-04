// groupInfoMixin
export const groupInfoMixin = {
  created() {
    let {groupId} = this.$route.query;
    this.$store.dispatch('common/act/GROUPINFO', {Vue: this, groupId});
  }
};
