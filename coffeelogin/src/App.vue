<template>
  <div id="app">
    <img class="background" :src="`${$store.state.imgUrl}background.jpg`"/>
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
  #app
    position: relative
    min-height: 100%
    .background
      position: absolute
      left: 0
      right: 0
      bottom: 0
      top: 0
      z-index: -1
</style>
