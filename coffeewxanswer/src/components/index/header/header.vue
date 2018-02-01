<template>
  <div class="_wrapper">
    <div class="background">
      <div class="banner_wrapper" v-if="couponInfo.length === 0">
        <img :src="`${$store.state.imgUrl}header_banner.png`" width="100%"/>
        <img class="icon" :src="`${$store.state.imgUrl}header_banner_icon.png`"/>
      </div>
      <div class="coupon_wrapper" v-if="couponInfo.length !== 0">
        <div class="coupon" :class="couponInfo.length !== 0 ? 'couponAni' : ''" :style="{position: rel}"
             ref="scrollWrapper">
          <ul>
            <li v-for="(coupon,index) in couponInfo" :ref="`scrollLi${index}`">
              <p class="time" v-if="coupon.couponEndTime*1000 > time">
                还剩{{parseInt((coupon.couponEndTime*1000 - time)/1000/60/60/24) + 1}}天
              </p>
              <p class="time" v-else>
                已过期
              </p>
              <p class="price">
                {{coupon.priceType === 1 ?
                coupon.couponPrice : coupon.couponPrice === 50 ?
                '半价' : coupon.couponPrice >= 100 ?
                '全免': coupon.couponPrice}}
                <span>
              {{coupon.priceType === 1 ? '元' : (coupon.couponPrice !== 50 && coupon.couponPrice < 100) ? '折' : ''}}
            </span>
              </p>
              <p class="name">
                {{coupon.ruleName}}
              </p>
              <img :src="`${$store.state.imgUrl}header_coupon.png`" width="80%"/>
            </li>
          </ul>
        </div>
        <a :href="herf" :class="couponInfo.length !== 0 ? 'btnAni' : ''">立即<br/>使用</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import BScroll from 'better-scroll';

  export default {
    name: 'v-header',
    data() {
      return {
        herf: `http://${window.location.host}/mobile/coffeewxapp/?#/`,
        time: new Date().getTime(),
        rel: '',
        myScroll: null
      };
    },
    watch: {
      couponInfo(val) {
        window.setTimeout(() => {
          window.setTimeout(() => {
            this.$refs.scrollWrapper.style.height = `${this.$refs.scrollLi0[0].clientHeight}px`;
            this.initBScroll();
          }, 1000);
          this.rel = 'relative';
        }, 2400);
      }
    },
    methods: {
      initBScroll() {
        this.$nextTick(() => {
          this.myScroll = new BScroll(this.$refs.scrollWrapper);
        });
      }
    },
    computed: {
      couponInfo() {
        return this.$store.getters['index/get/COUPONINFO'];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    position: relative
    .background
      height: 2.3rem
      overflow: hidden
      background-color: #171d2d
      border-radius: 0% 0% 50% 50%
      .banner_wrapper
        .icon
          position: absolute
          left: 50%
          bottom: -50%
          width: 15%
          transform: translate(-50%, -50%)
      .coupon_wrapper
        a
          color: #fff
          position: absolute
          z-index: 10
          left: 50%
          bottom: -50%
          width: 15%
          transform: translate(-50%, -50%)
          border-radius: 50%
          background-color: #e54d35
          width: 1.13rem
          height: 1.13rem
          box-sizing: border-box
          text-align: center
          padding-top: 0.28rem
          border: 1px solid #ff8570
        .btnAni
          animation: btn-ani 4s
        .coupon
          position: absolute
          z-index: 9
          text-align: center
          color: #fff
          overflow: hidden
          ul
            li
              position: relative
              height: 2.1rem
              margin-bottom: 0.3rem
              .time
                position: absolute
                top: 45%
                left: 14%
                font-size: 0.24rem
              .price
                position: absolute
                top: 34%
                right: 18%
                font-size: 0.5rem
                span
                  font-size: 0.3rem
              .name
                position: absolute
                top: 28%
                left: 14%
                font-size: 0.3rem
        .couponAni
          transition-timing-function: cubic-bezier(.62, .38, .34, 1.5)
          transition-duration: 1s
          animation: ani 3s

  @keyframes ani
    0%
      opacity: 0
      transform: translate(0%, 4rem) scale(1.1, 1.1)
    20%
      opacity: 1
      transform: translate(0%, 4rem) scale(1.1, 1.1)
    40%
      transform: translate(0%, 4rem) scale(1.1, 1.1)
    80%
      transform: translate(0%, -1rem) scale(1.1, 1.1)
    100%
      transform: translate(0%, 0%) scale(1, 1)

  @keyframes btn-ani
    0%
      opacity: 0
    50%
      opacity: 0
    100%
      opacity: 1

</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
