<template>
  <transition name="fade-in">
    <div class="_wrapper fade-in" v-if="showFlag" @touchmove.prevent>
      <div class="background"></div>
      <div class="content">
        <img :src="`${$store.state.imgUrl}coupon.png`"/>
        <div class="coupon">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="coupon in coupons" :key="coupon.ruleName">
              <coupon :coupon="coupon"></coupon>
            </div>
          </div>
        </div>
        <div class="bottom">
          <a href="http://org.oa.mattburg.cn/mobile/coffeewxapp/#/">立即使用</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import coupon from '@/components/common/coupon/coupon';

  export default {
    name: 'index_rule',
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      open() {
        this.showFlag = true;
        this.$nextTick(() => {
          this.initSwiper();
        });
      },
      initSwiper() {
        /* eslint-disable no-new */
        new window.Swiper('.coupon', {
          loop: false,
          autoplay: 2000,
          autoplayDisableOnInteraction: false
        });
      }
    },
    computed: {
      coupons() {
        return this.$store.getters['index/get/COUPONS'];
      }
    },
    components: {
      coupon
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    position: fixed
    width: 100%
    height: 100%
    z-index: 30
    .background
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgba(0, 0, 0, .3)
    .content
      position: absolute
      right: 0
      left: 0
      top: 2%
      z-index: 9
      width: 85%
      margin: 0 auto
      .bottom
        position: absolute
        bottom: 0
        left: 0
        right: 0
        height: 1.35rem
        line-height: 1.35rem
        text-align: center
        a
          font-size: 0.4rem
          color: #973e1c
          font-weight: 600
      .coupon
        position: absolute
        top: 3.7rem
        left: 0
        right: 0
        height: 3.5rem
        padding: 0.2rem
        overflow: hidden
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
