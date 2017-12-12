<template>
  <div class="__wrapper">
    <img src="./lucky.png">
    <div class="right swiper-container">
      <div class="swiper-wrapper" v-if="info">
        <div class="clearfix swiper-slide" v-for="user in info.userRecords" :key="user.userName">
          <img v-if="user.avatar" :src="user.avatar"/>
          <img v-if="!user.avatar" src="./head.png">
          <div>
            <p>{{user.userName}}</p>
            <p>{{user.couponName}}</p>
            <span>{{getTimeStr((new Date().getTime() / 1000) - user.createTime)}}前</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: '',
    methods: {
      initSwiper() {
        this.$nextTick(() => {
          /* eslint-disable no-new */
          new window.Swiper('.swiper-container', {
            loop: true,
            direction: 'vertical',
            autoplay: 2000,
            autoplayDisableOnInteraction: false
          });
        });
      },
      getTimeStr(seconds) {
        if (seconds > 60 * 60 * 24) {
          return parseInt(seconds / (60 * 60 * 24)) + '天';
        } else if (seconds > 60 * 60) {
          return parseInt(seconds / 3600) + '小时';
        } else if (seconds > 60) {
          return parseInt(seconds / 60) + '分钟';
        } else {
          return parseInt(seconds) + '秒';
        }
      }
    },
    computed: {
      info() {
        return this.$store.getters['index/get/INFO'];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .__wrapper
    margin-top: 3%
    height: 1.8rem
    width: 100%
    background-color: #fff
    box-sizing: border-box
    padding: 2% 6%
    > img:nth-child(1)
      width: 28%
      animation: tada 2s infinite
      margin-top: 0.3rem
    @keyframes tada
      from
        transform: scale3d(1, 1, 1)
      10%, 20%
        transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)
      30%, 50%, 70%, 90%
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)
      40%, 60%, 80%
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)
      to
        transform: scale3d(1, 1, 1)
    .right
      float: right
      width: 69%
      height: 100%
      border-left-style: solid
      border-left-color: #b6b6b6
      border-left-width: 1px
      overflow: hidden
      > div
        padding-top: 0.4rem
        > div
          width: 100%
          img
            float: left
            width: 20%
            margin-left: 5%
          > div
            margin-top: 0.1rem
            float: right
            width: 70%
            position: relative
            p
              font-size: 0.28rem
              margin-left: 2%
            p:nth-child(1)
              padding-top: 1.5%
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              width: 100%
            p:nth-child(2)
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              margin-left: 2%
              margin-top: 1%
            span
              color: #898886
              position: absolute
              font-size: 0.27rem
              right: 0
              top: -0.25rem
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
