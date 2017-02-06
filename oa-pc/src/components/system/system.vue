<template>
  <contentwrapper :routerList="routerList"></contentwrapper>
</template>

<script type="text/ecmascript-6">
  import contentwrapper from 'components/common/contentwrapper';

  export default {
    data() {
      return {
        routerList: [{
          title: '系统设置',
          list: [{
            name: '菜单管理',
            url: '/system/systemMenu'
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
