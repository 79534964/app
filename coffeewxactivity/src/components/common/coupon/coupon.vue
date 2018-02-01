<template>
  <div class="common-coupon">
    <div class="content">
      <div class="left">
        <div>{{coupon.ruleName}}</div>
        <div class="day">
          <p class="time" v-if="coupon.couponEndTime*1000 > time">
            还剩{{parseInt((coupon.couponEndTime * 1000 - time) / 1000 / 60 / 60 / 24) + 1}}天
          </p>
          <p class="time" v-else>
            已过期
          </p>
        </div>
      </div>
      <div class="other" v-if="coupon.priceType ===2 && (coupon.couponPrice === 50 || coupon.couponPrice === 100)">
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
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'common-coupon',
    data() {
      return {
        time: new Date()
      };
    },
    props: {
      coupon: {
        type: Object
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .common-coupon
    position: relative
    height: 1.65rem
    background-size: 100% 100% !important
    background: url(use.png) no-repeat
    .content
      width: 100%
      height: 100%
      padding: 0.4rem 0.5rem
      color: #fff
      box-sizing: border-box
      display: flex
      justify-content: space-between
      .left
        display: flex
        flex-direction: column
        justify-content: space-around
        text-align: left
        font-size: 0.3rem
        .day
          font-size: 0.24rem
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
    .bottom
      height: .7rem
      background-color: #fff
      position: relative
      top: -10px
      z-index: -1
      border-radius: 0px 0px 4px 4px
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
