<template>
  <div class="wrapper">
    <banner></banner>
    <red></red>
    <point></point>
    <people></people>
    <rule></rule>
  </div>
</template>

<script type="text/ecmascript-6">

  import banner from './banner/banner';
  import red from './red/red';
  import point from './point/point';
  import people from './people/people';
  import rule from './rule/rule';
  import {groupInfoMixin} from '@/common/js/mixins';

  export default {
    name: 'index',
    mixins: [groupInfoMixin],
    components: {
      banner,
      red,
      point,
      people,
      rule
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    background-color: #f4f4f4
</style>
