<template>
  <div class="_wrapper" v-if="groupInfo !== null">
    <img :src="groupInfo.img"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'index_banner',
    computed: {
      groupInfo() {
        return this.$store.getters['index/get/GROUPINFO'];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    font-size: 0
    min-height: 3rem
    img
      width: 100%
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
