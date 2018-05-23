<template>
  <div id="app">
    <loading></loading>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import loading from '@/components/common/loading/loading';

  export default {
    name: 'app',
    components: {
      loading
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    width: 100%
    height: 100%
    position: relative
    overflow: hidden
</style>
