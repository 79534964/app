<template>
  <contentwrapper :routerList="routerList"></contentwrapper>
</template>

<script type="text/ecmascript-6">
  import contentwrapper from 'components/common/contentwrapper/contentwrapper';

  export default {
    data() {
      return {
        routerList: [{
          title: '自动贩卖机',
          list: [{
            name: '机器销售报表',
            url: '/data/dataMachine'
          }]
        }]
      };
    },
    components: {
      contentwrapper
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
