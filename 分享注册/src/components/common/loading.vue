<template>
  <transition name="fade-in">
    <div class="common-loading fade-in" v-show="loading">
      <div class="content">
        <img class="img" :src="`${$store.state.imgUrl}loading.gif`"/>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'common-loading',
    computed: {
      loading() {
        return this.$store.getters['common/get/LOADING'];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .common-loading
    position: absolute
    z-index: 999
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.2)
    .content
      width: 25%
      margin: 0 auto
      margin-top: 50%
      .img
        width: 100%
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
