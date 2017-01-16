<template>
  <contentwrapper :routerList="routerList"></contentwrapper>
</template>

<script type="text/ecmascript-6">
  import contentwrapper from 'components/common/contentwrapper/contentwrapper';

  export default {
    data() {
      return {
        routerList: [{
          title: '订单中心',
          list: [{
            name: '查询订单明细',
            url: '/order/orderQuery'
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
