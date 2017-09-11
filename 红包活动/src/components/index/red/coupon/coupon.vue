<template>
  <div class="__wrapper" v-if="done.length !== 0">
    <div class="content" v-for="coupon in done">
      <div class="item">
        <div class="left">
          <div>{{coupon.ruleName}}</div>
        </div>
        <div class="other" v-if="coupon.priceType === 2 && (coupon.couponPrice === 50 || coupon.couponPrice === 100)">
          {{coupon.couponPrice === 50 ? '半价券' : '全免券'}}
        </div>
        <div class="right" v-else>
          <div class="type">
            {{coupon.priceType === 1 ? '元' : '折'}}
          </div>
          <div class="price">
            {{coupon.priceType === 1 ? coupon.couponPrice : (coupon.couponPrice / 10)}}
          </div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'index_red_coupon',
    computed: {
      done() {
        return this.$store.getters['index/get/DONE'];
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .__wrapper
    position: relative
    .content
      box-shadow: 0 4px 3px #dfdfdf
      border-radius: 4px
      .bottom
        height: 0.5rem
        margin-bottom: 0.3rem
      .item
        display: flex
        justify-content: space-between
        background: url(use.png) no-repeat
        background-size: 100% 100%
        width: 100%
        height: 100%
        padding: 0.4rem 0.5rem
        color: #fff
        box-sizing: border-box
        .left
          display: flex
          flex-direction: column
          justify-content: space-around
          text-align: left
          font-size: 0.3rem
        .right
          display: flex
          .type
            padding-top: 0.46rem
            font-size: 0.3rem
            margin-right: 0.05rem
          .price
            font-size: 0.9rem
        .other
          font-size: 0.5rem
          padding-top: 0.1rem
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
