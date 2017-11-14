<template>
  <div id="app">
    <qqShareImg></qqShareImg>
    <loading></loading>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import loading from '@/components/common/loading';
  import qqShareImg from '@/components/common/qqShareImg';

  export default {
    name: 'app',
    components: {
      loading,
      qqShareImg
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
