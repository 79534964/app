<template>
  <div class="wrapper" v-if="groupInfo">
    <img :src="groupInfo.img"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'qqShareImg',
    computed: {
      groupInfo() {
        return this.$store.getters['index/get/GROUPINFO'];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    font-size: 0
    opacity: 0
    img
      width: 0px
      height: 0px

</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
