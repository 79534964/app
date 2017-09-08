<template>
  <div class="_wrapper" v-if="$store.state.isWeiXin === 0 && groupFlag">
    <div class="content">
      仅限在微信中打开哦
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'index_point',
    computed: {
      groupFlag() {
        return this.$store.getters['index/get/GROUPFLAG'];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    background-color: #fff
    padding: 0.3rem
    .content
      height: 2rem;
      box-shadow: 0 4px 3px #dfdfdf
      border-radius: 4px
      text-align: center
      line-height: 2rem
      font-size: 0.4rem
      font-weight: 600
      color: #cdcdcd

</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
