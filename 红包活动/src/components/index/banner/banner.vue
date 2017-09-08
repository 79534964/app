<template>
  <div class="_wrapper" v-if="groupInfo !== null">
    <a v-if="groupInfo.htmlUrl" :href="groupInfo.htmlUrl">
    </a>
    <img :src="groupInfo.shareImgUrl"/>
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
    position: relative
    font-size: 0
    min-height: 3rem
    a
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
    img
      width: 100%
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
