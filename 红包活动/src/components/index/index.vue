<template>
  <div class="wrapper">
    <banner></banner>
    <red></red>
    <point></point>
  </div>
</template>

<script type="text/ecmascript-6">

  import banner from './banner/banner';
  import red from './red/red';
  import point from './point/point';
  import {groupInfoMixin} from '@/common/js/mixins';

  export default {
    name: 'index',
    mixins: [groupInfoMixin],
    data() {
      return {};
    },
    created() {
    },
    components: {
      banner,
      red,
      point
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    background-color: #f4f4f4
</style>
