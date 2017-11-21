<template>
  <transition name="fade">
    <div class="wrapper" v-show="loading" @touchmove.prevent>
      <div class="content">
        <img class="loading" :src="`${$store.state.imgUrl}loading.gif`"/>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'loading',
    computed: {
      loading() {
        return this.$store.getters['common/get/LOADING'];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    position: fixed
    z-index: 99999
    left: 0
    top: 0
    width: 100%
    height: 100%
    transition: all 0.3s
    &.fade-enter-active
      opacity: 0
    &.fade-leave-active
      opacity: 0
    .content
      width: 25%
      margin: 0 auto
      margin-top: 35%
      .loading
        width: 100%
        background-color: rgba(255,255,255,0.5)
        border-radius: 5%
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
