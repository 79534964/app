<template>
  <div class="wrapper">
    <div class="content">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {checkGroupInfoMixin, userTypeMixin} from '@/common/js/mixins';

  export default {
    name: 'index',
    mixins: [checkGroupInfoMixin, userTypeMixin],
    data() {
      return {};
    },
    created() {
      this.mixin_checkGroupInfo();
    },
    components: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
