<template>
  <div id="app">
    <loading></loading>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import loading from '@/components/common/loading';

  export default {
    name: 'app',
    components: {
      loading
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
