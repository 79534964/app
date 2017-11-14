<template>
  <div class="__wrapper">
    <div class="content">
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
      <div class="bottom">
        <p v-if="!coupon.couponEndTime">不限时间</p>
        <p v-else>{{parseInt((coupon.couponEndTime - time)/(24*60*60))}}天后过期</p>
      </div>
    </div>
    <mt-button class="href" @click="goHref()">
      立即使用
    </mt-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'index_red_coupon',
    data() {
      return {
        time: new Date().getTime() / 1000
      };
    },
    methods: {
      goHref() {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.mattburg_coffee.application';
      }
    },
    computed: {
      coupon() {
        return this.$store.getters['index/get/COUPON'];
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
        line-height: 0.5rem
        p
          color: #676767
          padding-left: 0.2rem
      .item
        display: flex
        justify-content: space-between
        background: url(use.png) no-repeat
        background-size: 100% 100%
        width: 100%
        height: 100%
        padding: 0.5rem
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
    .href
      width: 100%
      margin-top: 0.5rem
      background: #009bec
      color: #fff
      padding: 0.17rem
      border-radius: 3px
      font-size: 0.33rem
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
